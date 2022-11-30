import UserModel from '../models/UsersModel.js';
import RoleUserModel from '../models/RoleUserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authRegister = async (req, res) => {
  const { username, email, password, conf_password } = req.body;
  if (password !== conf_password) {
    return res
      .status(400)
      .json({ status: 400, data: 'Password and confirm password not match' });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await UserModel.create({
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
    res.status(400).json({ status: 400, data: message });
  }
};

export const authLogin = async (req, res) => {
  const { username = '', password = '' } = req.body;
  try {
    const dataUser = await UserModel.findOne({
      where: {
        username: username,
      },
      include: {
        model: RoleUserModel,
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

    const token = jwt.sign(
      {
        id: dataUser?.id,
        username: dataUser?.username,
        role: dataUser?.user_role?.value,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: '7d' }
    );

    res.status(200).json({ status: 200, data: { token } });
  } catch (e) {
    res.status(500).json({ status: 500, data: e?.message });
  }
};

export const authMe = async (req, res) => {
  if (req?.isLoggedIn) {
    res.status(200).json({ status: 200, data: req?.dataUser });
  } else {
    res.status(401).json({ status: 401, data: 'Access unauthorized' });
  }
};

export const authLogout = async (req, res) => {};
