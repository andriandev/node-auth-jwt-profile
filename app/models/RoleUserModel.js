import { Sequelize } from 'sequelize';
import DB from '../config/Database.js';

const { DataTypes } = Sequelize;

const UserRole = DB.define(
  'user_roles',
  {
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

export default UserRole;
