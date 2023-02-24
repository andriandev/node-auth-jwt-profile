import express from 'express';
import {
  authRegister,
  authLogin,
  authLogout,
  authMe,
} from '../controllers/AuthController.js';
import { isLoggedIn } from '../middleware/AuthMiddleware.js';
import { restrictRateLimit } from '../middleware/RateLimitMiddleware.js';

const router = express.Router();

router.post('/auth/register', restrictRateLimit, authRegister);
router.post('/auth/login', restrictRateLimit, authLogin);
router.get('/auth/me', isLoggedIn, authMe);
router.get('/auth/logout', authLogout);

export default router;
