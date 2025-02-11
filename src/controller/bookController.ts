import { RequestHandler } from "express";
import { Book } from "../model/bookModel.js";

export const createBook:RequestHandler = async(req,res)=>{
    try {
        const {title,publication_date,price,author_id,category_id,isbn}=req.body;
        if (!title ||!publication_date || !price || !author_id || !category_id || !isbn){
            res.status(400).send({
                success: false,
                message: "All fields are required.",
            });
            return;
        }
        const book = await Book.create({title,publication_date,price,author_id,category_id,isbn} as any);
        res.status(200).send({
            message:"Book created successfully",
            data:book
        })
    } catch (error) {
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
    try {
        const ISBN=req.params.id;
        if(!ISBN){
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
                }
            })
        res.status(200).send({
            message: "Book details updated successfully",
            success: true,
            data: book,
        })
        } catch (error) {
            res.status(500).send({
                success: false,
                error,
            })
    }
}

export const deleteBookDetails:RequestHandler = async(req,res)=>{
    try {
        const ISBN=req.params.id;
        if(!ISBN){
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
            }
        })
        res.status(200).send({
            message: "Book details updated successfully",
            success: true,
            data: book,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        })
    }
}