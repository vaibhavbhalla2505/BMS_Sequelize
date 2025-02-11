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
import { Author } from "../model/authorModel.js";
import { Category } from "../model/categoryModel.js";
import { Books } from "../model/bookDataModel.js";
import sequelize from "sequelize";
export const combineBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book.findAll({
            attributes: ["title", "publication_date", "price", "isbn", "author_id", "category_id"],
            include: [
                {
                    model: Author,
                    attributes: [
                        [sequelize.fn("CONCAT", sequelize.col("first_name"), " ", sequelize.col("last_name")), "author_name"],
                    ],
                },
                {
                    model: Category,
                    attributes: [["genre", "category"]],
                },
            ],
        });
        for (const book of books) {
            const author = yield Author.findByPk(book.dataValues.author_id);
            const category = yield Category.findOne({ where: { category_id: book.dataValues.category_id } });
            yield Books.create({
                title: book.dataValues.title,
                publication_date: book.dataValues.publication_date,
                price: book.dataValues.price,
                isbn: book.dataValues.isbn,
                author_name: `${author.dataValues.first_name} ${author.dataValues.last_name}`,
                genre: category.dataValues.genre
            });
        }
        res.status(200).send({
            message: "Book details fetched successfully",
            success: true,
            data: books,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
