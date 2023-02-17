import { Sequelize } from 'sequelize';
import DB from '../config/Database.js';

const { DataTypes } = Sequelize;

const Data = DB.define(
  'data',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true,
      },
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Data;
