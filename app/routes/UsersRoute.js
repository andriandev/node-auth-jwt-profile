import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/UsersController.js';
import { isLoggedIn, isAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/user', isLoggedIn, isAdmin, getUsers);
router.get('/user/:id', isLoggedIn, isAdmin, getUserById);
router.post('/user', isLoggedIn, isAdmin, createUser);
router.put('/user/:id', isLoggedIn, isAdmin, updateUser);
router.delete('/user/:id', isLoggedIn, isAdmin, deleteUser);

export default router;
