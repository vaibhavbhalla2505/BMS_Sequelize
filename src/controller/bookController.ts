import { RequestHandler } from "express";
import { Book } from "../model/bookModel.js";
import { sequelize } from "../config/dbConnect.js";
import { Author } from "../model/authorModel.js";
import { Category } from "../model/categoryModel.js";
import { Readable } from "stream";
import EventEmitter from "events";

const eventEmitter=new EventEmitter();
export const createBook:RequestHandler = async(req,res)=>{
    const transaction=await sequelize.transaction();
    try {
        const {title,publication_date,price,author_id,category_id,isbn}=req.body;
        if (!title ||!publication_date || !price || !author_id || !category_id || !isbn){
            await transaction.rollback();
            console.log('rollback transaction');
            res.status(400).send({
                success: false,
                message: "All fields are required.",
            });
            return;
        }
        //check if authors exists
        const authorExists = await Author.findByPk(author_id);
          if (!authorExists) {
            throw new Error(`Author with ID ${author_id} not found`);
          }

          // Check if category exists
          const categoryExists = await Category.findByPk(category_id);
          if (!categoryExists) {
            throw new Error(`Category with ID ${category_id} not found`);
          }
        const book = await Book.create({title,publication_date,price,author_id,category_id,isbn} as any,{transaction});

        await transaction.commit();
        console.log('commit transaction');

        res.status(200).send({
            message:"Book created successfully",
            data:book
        })
    } catch (error) {
        await transaction.rollback();
        console.log('rollback transaction');
        res.status(500).send({
            success: false,
            error,
        })
    }
}

export const getAllBooks:RequestHandler=async (req, res) => {
    try {
        const books=await Book.findAll();
        res.status(200).send({
            success: true,
            data: books
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        })
    }
}

export const updateBookDetails:RequestHandler=async(req,res)=>{
    const transaction=await sequelize.transaction();
    try {
        const ISBN=req.params.id;
        if(!ISBN){
            await transaction.rollback();
            console.log('rollback transaction');
            res.status(400).send({
                success: false,
                message: "ISBN is required",
            });
            return;
        }
        const book=await Book.update(
            {title:"harry potter"},
            {
                where:{
                   isbn: ISBN
                },
                transaction
            })
            await transaction.commit();
            console.log('commit transaction');
            res.status(200).send({
                message: "Book details updated successfully",
                success: true,
                data: book,
            })
        } catch (error) {
            await transaction.rollback();
            console.log('rollback transaction');
            res.status(500).send({
                success: false,
                error,
            })
    }
}

export const deleteBookDetails:RequestHandler = async(req,res)=>{
    const transaction=await sequelize.transaction();
    try {
        const ISBN=req.params.id;
        if(!ISBN){
            await transaction.rollback();
            console.log('rollback transaction');
            res.status(400).send({
                success: false,
                message: "ISBN is required",
            });
            return;
        }
        const book=await Book.destroy(
            {
            where:{
                isbn: ISBN
            },
            transaction
        })

        await transaction.commit();
        console.log('commit transaction');

        res.status(200).send({
            message: "Book details updated successfully",
            success: true,
            data: book,
        })
    } catch (error) {
        await transaction.rollback();
        console.log('rollback transaction');
        res.status(500).send({
            success: false,
            error,
        })
    }
}

export const bulkBook:RequestHandler = async (req,res) => {
    const books = req.body; 
    if (!Array.isArray(books)) {
      res.status(400).json({ error: 'Must be an array of Books' });
    }
  
    try {
      const bookStream = Readable.from(books);
  
      bookStream
        .on('data', async (bookData) => {
          bookStream.pause(); 
          try {
            const book = await Book.create({
              title: bookData.title,
              author_id: bookData.author_id,
              isbn: bookData.isbn,
              publication_date: bookData.publication_date,
              price: bookData.price,
              category_id: bookData.category_id, 
            });
  
            eventEmitter.emit('bookCreated', book);
          } catch (error: any) {
            console.error('Error processing book:', error.message);
          }
          bookStream.resume();
        })
        .on('end', () => {
          res.status(200).json({ message: `${books.length} books processed` });
        })
        .on('error', (error) => {
          res.status(500).json({ error: error.message });
        });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};
  