import express from 'express';
import { NotFound } from '../controllers/PagesController.js';

const router = express.Router();

router.use('/', NotFound);

export default router;
