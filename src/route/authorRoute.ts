import express  from "express";
import { createAuthor, deleteAuthor, getAllAuthor, updateAuthor } from "../controller/authorController.js";
const router= express.Router();

router.post('/create-author',createAuthor);
router.get('/getAllAuthor',getAllAuthor);
router.put('/update-author/:id',updateAuthor);
router.delete('/delete-author/:id',deleteAuthor);

export default router;