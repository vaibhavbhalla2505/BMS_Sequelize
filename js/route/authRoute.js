import express from "express";
import { createAuthor, getAllAuthor } from "../controller/authorController.js";
const router = express.Router();
router.post('/create-author', createAuthor);
router.get('/getAllAuthor', getAllAuthor);
// router.post('/category',)
export default router;
