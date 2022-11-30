import jwt from 'jsonwebtoken';
import UserModel from '../models/UsersModel.js';
import RoleUserModel from '../models/RoleUserModel.js';

export const isLoggedIn = async (req, res, next) => {
  // Check if req.headers.authorization exist
  if (
    req?.headers?.authorization &&
    req?.headers?.authorization?.startsWith('Bearer')
  ) {
    try {
      // Get token
      const token = req?.headers?.authorization?.split(' ')[1];

      // Decode token
      const tokenDecoded = jwt.verify(token, process.env.SECRET_TOKEN);

      // Get user from database by id
      const dataUser = await UserModel.findOne({
        where: { id: tokenDecoded?.id },
        attributes: { exclude: ['password'] },
        include: {
          model: RoleUserModel,
          attributes: ['id', 'value'],
        },
      });

      // Check data user if exist
      if (dataUser) {
        // Set variabel req
        req.dataUser = dataUser;

        // Check if user role == banned
        if (dataUser?.user_role?.value == 'banned') {
          return res
            .status(403)
            .json({ status: 403, data: 'Account has been banned' });
        }

        req.isLoggedIn = true;
        req.isRole = dataUser?.user_role?.value;
      } else {
        res.status(401).json({ status: 401, data: 'Access unauthorized' });
      }

      next();
    } catch (e) {
      // Get error name and error message
      const nameError = e?.name;
      let message = e?.message;

      // Set error message based on jwt error name
      if (nameError == 'TokenExpiredError') {
        message = 'Token expired';
      } else if (nameError == 'JsonWebTokenError') {
        message = 'Invalid token credential';
      } else if (nameError == 'NotBeforeError') {
        message = 'Token not active';
      }
      res.status(400).json({ status: 400, data: message });
    }
  } else {
    res.status(401).json({ status: 401, data: 'Access unauthorized' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req?.isLoggedIn && req?.isRole == 'admin') {
    next();
  } else {
    res.status(403).json({ status: 403, data: 'Access denied, admin only' });
  }
};
