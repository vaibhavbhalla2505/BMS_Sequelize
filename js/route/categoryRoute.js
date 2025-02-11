import express from 'express';
import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../controller/categoryController.js';
const router = express.Router();
router.post('/create-category', createCategory);
router.get('/getAllCategory', getAllCategory);
router.put('/update-category/:id', updateCategory);
router.delete('/delete-category/:id', deleteCategory);
export default router;
