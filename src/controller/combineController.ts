import { RequestHandler } from "express";
import { Book } from "../model/bookModel.js";
import { Author } from "../model/authorModel.js";
import { Category } from "../model/categoryModel.js";
import { Books } from "../model/bookDataModel.js";
import sequelize from "sequelize";

export const combineBook:RequestHandler=async(req,res)=>{
    try {
        const books = await Book.findAll({
            attributes: ["title", "publication_date", "price","isbn","author_id","category_id"],
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
          for(const book of books as any[]){
            const author:any=await Author.findByPk(book.dataValues.author_id);
            const category:any=await Category.findOne({where: {category_id: book.dataValues.category_id}});
            await Books.create({
                title: book.dataValues.title,
                publication_date: book.dataValues.publication_date,
                price: book.dataValues.price,
                isbn: book.dataValues.isbn,
                author_name: `${author.dataValues.first_name} ${author.dataValues.last_name}`,
                genre:category.dataValues.genre
              });
            }
          res.status(200).send({
            message: "Book details fetched successfully",
            success: true,
            data: books,
          })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        })
    }
}