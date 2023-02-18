import { Sequelize } from 'sequelize';
import DB from '../config/Database.js';

const { DataTypes } = Sequelize;

const Post = DB.define(
  'post',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true,
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true,
      },
    },
    stack: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true,
      },
    },
    preview: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    source_code: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    status: {
      type: DataTypes.ENUM('public', 'private'),
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
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

export default Post;
