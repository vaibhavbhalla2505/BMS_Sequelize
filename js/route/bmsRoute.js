import express from 'express';
import { deleteBook, updateBookDetails } from '../controller/bmsController.js';
const router = express.Router();
router.put('/update-book/:id', updateBookDetails);
router.delete('/delete-book/:id', deleteBook);
export default router;
