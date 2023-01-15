import UsersModel from '../models/UsersModel.js';
import UserRolesModel from '../models/UserRolesModel.js';
import bcrypt from 'bcrypt';
import DB from '../config/Database.js';
import { QueryTypes } from 'sequelize';

export const getUsers = async (req, res) => {
  try {
    // const dataUser = await UsersModel.findAll({
    //   order: [['id', 'DESC']],
    //   attributes: { exclude: ['password', 'role_id'] },
    //   include: {
    //     model: UserRolesModel,
    //     attributes: ['value'],
    //   },
    // });

    const dataUser = await DB.query(
      `SELECT users.id, users.username, users.email, user_roles.value AS role, users.created_at, users.updated_at FROM users INNER JOIN user_roles ON users.role_id=user_roles.id ORDER BY users.id DESC`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.status(200).json({ status: 200, data: dataUser });
  } catch (e) {
    return res.status(500).json({ status: 500, data: e?.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    // const dataUser = await UsersModel.findOne({
    //   where: {
    //     id: req.params.id,
    //   },
    //   attributes: { exclude: ['password', 'role_id'] },
    //   include: {
    //     model: UserRolesModel,
    //     attributes: ['value'],
    //   },
    // });

    const dataUser = await DB.query(
      `SELECT users.id, users.username, users.email, user_roles.value AS role, users.created_at, users.updated_at FROM users INNER JOIN user_roles ON users.role_id=user_roles.id WHERE users.id=${req.params.id}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (!dataUser) {
      return res.status(404).json({ status: 404, data: 'User not found' });
    }

    return res.status(200).json({ status: 200, data: dataUser[0] });
  } catch (e) {
    return res.status(500).json({ status: 500, data: e?.message });
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
    // `INSERT INTO users (username, email, password, role_id, created_at, updated_at) VALUES ('${username}', '${email}', '${hashPassword}', ${role_id}, CONVERT('${currentDate}', DATETIME), CONVERT('${currentDate}', DATETIME))`
    await UsersModel.create({
      username, // username: username
      email, // email: email
      password: hashPassword,
      role_id, // role_id: role_id
    });

    return res.status(201).json({ status: 200, data: 'Register succesfully' });
  } catch (e) {
    let message = e?.message;
    if (e?.name == 'SequelizeUniqueConstraintError') {
      message = 'Username or Email is already exist';
    }
    return res.status(400).json({ status: 400, data: message });
  }
};

export const updateUser = async (req, res) => {
  const dataUser = await UsersModel.findOne({
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
    // `UPDATE users SET username='${username}', email='${email}', password='${hashPassword}', role_id=${role_id}, updated_at=CONVERT('${currentDate}', DATETIME) WHERE id=${dataUser.id}`
    await UsersModel.update(
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

    return res
      .status(200)
      .json({ status: 200, data: 'User updated succesfully' });
  } catch (e) {
    let message = e?.message;
    if (e?.name == 'SequelizeUniqueConstraintError') {
      message = 'Username or Email is already exist';
    }
    return res.status(400).json({ status: 400, data: message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // `DELETE FROM users WHERE id=${req.params.id}`
    const status = await UsersModel.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (status) {
      return res
        .status(200)
        .json({ status: 200, data: 'User deleted succesfully' });
    } else {
      return res.status(404).json({ status: 404, data: 'User not found' });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, data: e?.message });
  }
};
