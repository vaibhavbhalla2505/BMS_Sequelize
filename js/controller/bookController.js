var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Book } from "../model/bookModel.js";
export const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, publication_date, price, author_id, category_id, isbn } = req.body;
        if (!title || !publication_date || !price || !author_id || !category_id || !isbn) {
            res.status(400).send({
                success: false,
                message: "All fields are required.",
            });
            return;
        }
        const book = yield Book.create({ title, publication_date, price, author_id, category_id, isbn });
        res.status(200).send({
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book.findAll();
        res.status(200).send({
            success: true,
            data: books
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const updateBookDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ISBN = req.params.id;
        if (!ISBN) {
            res.status(400).send({
                success: false,
                message: "ISBN is required",
            });
            return;
        }
        const book = yield Book.update({ title: "harry potter" }, {
            where: {
                isbn: ISBN
            }
        });
        res.status(200).send({
            message: "Book details updated successfully",
            success: true,
            data: book,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const deleteBookDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ISBN = req.params.id;
        if (!ISBN) {
            res.status(400).send({
                success: false,
                message: "ISBN is required",
            });
            return;
        }
        const book = yield Book.destroy({
            where: {
                isbn: ISBN
            }
        });
        res.status(200).send({
            message: "Book details updated successfully",
            success: true,
            data: book,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
