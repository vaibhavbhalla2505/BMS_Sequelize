import { RequestHandler } from "express"
import { Author } from "../model/authorModel.js";

export const createAuthor:RequestHandler=async(req,res)=>{
    try {
        const {first_name,last_name} = req.body;
        if (!first_name || !last_name) {
            res.status(400).send({
                success: false,
                message: "Both first_name and last_name are required.",
            });
            return;
        }
        const author = await Author.create({first_name, last_name} as any);
        res.status(200).send({
            message:"Author created successfully",
            data:author
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
}

export const getAllAuthor:RequestHandler=async (req, res) => {
    try {
        const authors=await Author.findAll();
        res.status(200).send({
            success: true,
            data: authors
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        })
    }
}

export const updateAuthor:RequestHandler=async(req,res)=>{
    try {
        const id=req.params.id;
        if(!id){
            res.status(400).send({
                success: false,
                message: "Author ID is required."
            });
            return;
        }
        const author=await Author.update(
            {first_name:"John Doe",last_name:"Smith"},
            {
                where:{
                    author_id:id
                }
            })
            res.status(200).send({
            message: "Author details updated successfully",
            success: true,
            data: author,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        })
    }
}

export const deleteAuthor:RequestHandler=async(req,res)=>{
    try {
        const id=req.params.id;
        if(!id){
            res.status(400).send({
                success: false,
                message: "Author ID is required."
            });
            return;
        }
        const author=await Author.destroy({
            where:{
                author_id:id
            }
        })
        res.status(200).send({
            message: "Author deleted successfully",
            success: true,
            data: author,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        })
    }
}