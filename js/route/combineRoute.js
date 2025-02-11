import express from 'express';
import { combineBook } from '../controller/combineController.js';
const router = express.Router();
router.get('/combine-book', combineBook);
export default router;
