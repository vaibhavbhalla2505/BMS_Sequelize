import { RequestHandler } from "express";
import { Books } from "../model/bookDataModel.js";
import { sequelize } from "../config/dbConnect.js";

export const updateBookDetails:RequestHandler = async(req,res)=>{
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
        const book=await Books.update(
            {isbn:"1234567898764",title:"harry potter"},
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

export const deleteBook:RequestHandler = async(req,res)=>{
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
        const book=await Books.destroy(
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