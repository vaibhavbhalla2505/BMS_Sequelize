import { RequestHandler } from "express";
import { Category } from "../model/categoryModel.js";
import { sequelize } from "../config/dbConnect.js";

export const createCategory:RequestHandler=async(req,res)=>{
    const transaction=await sequelize.transaction();
    try {
        const {genre}=req.body;
        if (!genre){
            await transaction.rollback();
            console.log('rollback transaction');
            res.status(400).send({
                success: false,
                message: "genre is required.",
            });
            return;
        }
        const category=await Category.create({genre} as any,{transaction});

        await transaction.commit();
        console.log('commit transaction');

        res.status(200).send({
            message:"Category created successfully",
            data:category
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

export const getAllCategory:RequestHandler=async (req, res) => {
    try {
        const categories=await Category.findAll();
        res.status(200).send({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        })
    }
}

export const updateCategory:RequestHandler=async(req,res)=>{
    const transaction = await sequelize.transaction();
    try {
        const id=req.params.id;
        if(!id){
            await transaction.rollback();
            console.log('rollback transaction');
            res.status(400).send({
                success: false,
                message: "id is required.",
            });
            return;
        }
        const category=await Category.update(
            {genre:"history"},
            {
                where:{
                    category_id:id
                },
                transaction
            }
        )

        await transaction.commit();
        console.log('commit transaction');

        res.status(200).send({
            message: "Category details updated successfully",
            success: true,
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

export const deleteCategory:RequestHandler=async(req,res)=>{
    const transaction=await sequelize.transaction();
    try {
        const id=req.params.id;
        if(!id){
            await transaction.rollback();
            console.log('rollback transaction');
            res.status(400).send({
                success: false,
                message: "id is required.",
            });
            return;
        }
        const category=await Category.destroy({
            where:{
                category_id:id
            },
            transaction
        })

        await transaction.commit();
        console.log('commit transaction');

        res.status(200).send({
            message: "Category deleted successfully",
            success: true,
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