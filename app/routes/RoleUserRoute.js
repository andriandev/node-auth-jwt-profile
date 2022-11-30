import express from 'express';
import {
  getUserRole,
  getUserRoleById,
  createUserRole,
  updateUserRole,
  deleteUserRole,
} from '../controllers/RoleUserController.js';
import { isLoggedIn, isAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/user-role', isLoggedIn, isAdmin, getUserRole);
router.get('/user-role/:id', isLoggedIn, isAdmin, getUserRoleById);
router.post('/user-role', isLoggedIn, isAdmin, createUserRole);
router.put('/user-role/:id', isLoggedIn, isAdmin, updateUserRole);
router.delete('/user-role/:id', isLoggedIn, isAdmin, deleteUserRole);

export default router;
