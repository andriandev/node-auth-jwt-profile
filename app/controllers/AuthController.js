import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UsersModel from '../models/UsersModel.js';
import UserRolesModel from '../models/UserRolesModel.js';
import cache from '../helpers/Cache.js';

export const authRegister = async (req, res) => {
  const { username, email, password, conf_password } = req.body;
  if (password !== conf_password) {
    return res
      .status(400)
      .json({ status: 400, data: 'Password and confirm password not match' });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await UsersModel.create({
      username, // username: username
      email, // email: email
      password: hashPassword,
      role_id: 2, // role_id: 2 (member)
    });
    res.status(201).json({ status: 200, data: 'Register succesfully' });
  } catch (e) {
    let message = e?.message;
    if (e?.name == 'SequelizeUniqueConstraintError') {
      message = 'Username or Email is already exist';
    }
    return res.status(400).json({ status: 400, data: message });
  }
};

export const authLogin = async (req, res) => {
  const { username = '', password = '' } = req.body;
  try {
    const dataUser = await UsersModel.findOne({
      where: {
        username: username,
      },
      include: {
        model: UserRolesModel,
        attributes: ['id', 'value'],
      },
    });

    if (!dataUser) {
      return res.status(404).json({ status: 404, data: 'User not found' });
    }

    // Check if user role == banned
    if (dataUser?.user_role?.value == 'banned') {
      return res
        .status(403)
        .json({ status: 403, data: 'Account has been banned' });
    }

    const checkPassword = await bcrypt.compare(password, dataUser?.password);

    if (!checkPassword) {
      return res
        .status(400)
        .json({ status: 400, data: 'Username and Password not match' });
    }

    const expiredToken = 172800; // 2 Days

    const token = jwt.sign(
      {
        id: dataUser?.id,
        username: dataUser?.username,
        role: dataUser?.user_role?.value,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: expiredToken }
    );

    return res
      .status(200)
      .json({ status: 200, token: token, expires_in: expiredToken });
  } catch (e) {
    return res.status(500).json({ status: 500, data: e?.message });
  }
};

export const authMe = async (req, res) => {
  if (req?.isLoggedIn) {
    return res.status(200).json({ status: 200, data: req?.dataUser });
  } else {
    return res.status(401).json({ status: 401, data: 'Access unauthorized' });
  }
};

export const authLogout = async (req, res) => {
  if (
    req?.headers?.authorization &&
    req?.headers?.authorization?.startsWith('Bearer')
  ) {
    // Get token
    const token = req?.headers?.authorization?.split(' ')[1];

    // Check session black list token
    let blackListToken = cache.has('blackListToken')
      ? cache.get('blackListToken')
      : [];

    // Store each token in array
    blackListToken.push(token);

    // Set blacklist token
    cache.set('blackListToken', blackListToken);
  }

  return res.status(200).json({ status: 200, data: 'Logout succesfully' });
};
