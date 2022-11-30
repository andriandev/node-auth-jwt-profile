import UserModel from '../models/UsersModel.js';
import RoleUserModel from '../models/RoleUserModel.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
  try {
    const dataUser = await UserModel.findAll({
      order: [['id', 'DESC']],
      attributes: { exclude: ['password'] },
      include: {
        model: RoleUserModel,
        attributes: ['id', 'value'],
      },
    });
    res.status(200).json({ status: 200, data: dataUser });
  } catch (e) {
    res.status(500).json({ status: 500, data: e?.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const dataUser = await UserModel.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ['password'] },
      include: {
        model: RoleUserModel,
        attributes: ['id', 'value'],
      },
    });
    if (!dataUser) {
      return res.status(404).json({ status: 404, data: 'User not found' });
    }
    res.status(200).json({ status: 200, data: dataUser });
  } catch (e) {
    res.status(500).json({ status: 500, data: e?.message });
  }
};

export const createUser = async (req, res) => {
  const { username, email, password, conf_password, role_id } = req.body;
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
      role_id, // role_id: role_id
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

export const updateUser = async (req, res) => {
  const dataUser = await UserModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!dataUser) {
    return res.status(404).json({ status: 404, data: 'User not found' });
  }

  const {
    username = dataUser.username,
    email = dataUser.email,
    password = '',
    conf_password = '',
    role_id = dataUser.role_id,
  } = req.body;

  let hashPassword;
  if (password === '' || password === null) {
    hashPassword = dataUser.password;
  } else {
    if (password !== conf_password) {
      return res.status(400).json({
        status: 400,
        data: 'Password and confirm password not match',
      });
    }

    hashPassword = await bcrypt.hash(password, 10);
  }

  try {
    await UserModel.update(
      {
        username, // username: username
        email, // email: email
        password: hashPassword,
        role_id, // role_id: role_id
      },
      {
        where: {
          id: dataUser.id,
        },
      }
    );
    res.status(200).json({ status: 200, data: 'User updated succesfully' });
  } catch (e) {
    let message = e?.message;
    if (e?.name == 'SequelizeUniqueConstraintError') {
      message = 'Username or Email is already exist';
    }
    res.status(400).json({ status: 400, data: message });
  }
};

export const deleteUser = async (req, res) => {
  const dataUser = await UserModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!dataUser) {
    return res.status(404).json({ status: 404, data: 'User not found' });
  }

  try {
    await UserModel.destroy({
      where: {
        id: dataUser.id,
      },
    });
    res.status(200).json({ status: 200, data: 'User deleted succesfully' });
  } catch (e) {
    res.status(400).json({ status: 400, data: e?.message });
  }
};
