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
router.get('/data/:name', getDataByName);
router.post('/data', isLoggedIn, isAdmin, createData);
router.put('/data/:id', isLoggedIn, isAdmin, updateData);
router.delete('/data/:id', isLoggedIn, isAdmin, deleteData);

export default router;
