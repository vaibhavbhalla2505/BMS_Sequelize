import express from 'express';
import { createBook, deleteBookDetails, getAllBooks, updateBookDetails } from '../controller/bookController.js';
const router = express.Router();
router.post('/create-book', createBook);
router.get('/getAllBooks', getAllBooks);
router.put('/update-book/:id', updateBookDetails);
router.delete('/delete-book/:id', deleteBookDetails);
export default router;
