import express from 'express';
import {
  getPost,
  getPostByType,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/PostController.js';
import { isLoggedIn } from '../middleware/AuthMiddleware.js';
import { defaultRateLimit } from '../middleware/RateLimitMiddleware.js';

const router = express.Router();

router.get('/post', defaultRateLimit, getPost);
router.get('/post/:type', defaultRateLimit, getPostByType);
router.post('/post', isLoggedIn, createPost);
router.put('/post/:id', isLoggedIn, updatePost);
router.delete('/post/:id', isLoggedIn, deletePost);

export default router;
