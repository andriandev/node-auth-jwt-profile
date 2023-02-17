import express from 'express';
import {
  getData,
  getDataByName,
  createData,
  updateData,
  deleteData,
} from '../controllers/DataController.js';
import { isLoggedIn, isAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/data', isLoggedIn, isAdmin, getData);
router.get('/data/:name', isLoggedIn, isAdmin, getDataByName);
router.post('/data', isLoggedIn, isAdmin, createData);
router.put('/data/:name', isLoggedIn, isAdmin, updateData);
router.delete('/data/:name', isLoggedIn, isAdmin, deleteData);

export default router;
