import { Sequelize } from 'sequelize';
import DB from '../config/Database.js';
import RoleUserModel from './RoleUserModel.js';

const { DataTypes } = Sequelize;

const Users = DB.define(
  'users',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 200],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

RoleUserModel.hasMany(Users, { foreignKey: 'role_id' });
Users.belongsTo(RoleUserModel, { foreignKey: 'role_id' });

export default Users;
