import { RequestHandler } from "express";
import { Books } from "../model/bookDataModel.js";

export const updateBookDetails:RequestHandler = async(req,res)=>{
    try {
        const ISBN=req.params.id;
        if(!ISBN){
            res.status(400).send({
                success: false,
                message: "ISBN is required",
            });
            return;
        }
        const book=await Books.update(
            {isbn:"1234567898764",title:"harry potter"},
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

export const deleteBook:RequestHandler = async(req,res)=>{
    try {
        const ISBN=req.params.id;
        if(!ISBN){
            res.status(400).send({
                success: false,
                message: "ISBN is required",
            });
            return;
        }
        const book=await Books.destroy(
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