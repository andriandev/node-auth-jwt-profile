import UserRolesModel from '../models/UserRolesModel.js';

export const getUserRole = async (req, res) => {
  try {
    const dataRole = await UserRolesModel.findAll();
    res.status(200).json({ status: 200, data: dataRole });
  } catch (e) {
    res.status(500).json({ status: 500, data: e?.message });
  }
};

export const getUserRoleById = async (req, res) => {
  try {
    const dataRole = await UserRolesModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!dataRole) {
      return res.status(404).json({ status: 404, data: 'Role not found' });
    }
    res.status(200).json({ status: 200, data: dataRole });
  } catch (e) {
    res.status(500).json({ status: 500, data: e?.message });
  }
};

export const createUserRole = async (req, res) => {
  const { value } = req.body;

  try {
    await UserRolesModel.create({
      value, // value: value
    });
    res.status(201).json({ status: 200, data: 'Role added succesfully' });
  } catch (e) {
    let message = e?.message;
    if (e?.name == 'SequelizeUniqueConstraintError') {
      message = 'Role is already exist';
    }
    res.status(400).json({ status: 400, data: message });
  }
};

export const updateUserRole = async (req, res) => {
  const dataRole = await UserRolesModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!dataRole) {
    return res.status(404).json({ status: 404, data: 'Role not found' });
  }

  const { value = dataRole.value } = req.body;

  try {
    await UserRolesModel.update(
      {
        value, // value: value
      },
      {
        where: {
          id: dataRole.id,
        },
      }
    );
    res.status(200).json({ status: 200, data: 'Role updated succesfully' });
  } catch (e) {
    let message = e?.message;
    if (e?.name == 'SequelizeUniqueConstraintError') {
      message = 'Role is already exist';
    }
    res.status(400).json({ status: 400, data: message });
  }
};

export const deleteUserRole = async (req, res) => {
  try {
    const status = await UserRolesModel.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (status) {
      return res
        .status(200)
        .json({ status: 200, data: 'Role deleted succesfully' });
    } else {
      return res.status(404).json({ status: 404, data: 'Role not found' });
    }
  } catch (e) {
    res.status(400).json({ status: 400, data: e?.message });
  }
};
