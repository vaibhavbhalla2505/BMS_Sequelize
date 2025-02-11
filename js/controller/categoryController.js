var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Category } from "../model/categoryModel.js";
export const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre } = req.body;
        if (!genre) {
            res.status(400).send({
                success: false,
                message: "genre is required.",
            });
            return;
        }
        const category = yield Category.create({ genre });
        res.status(200).send({
            message: "Category created successfully",
            data: category
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category.findAll();
        res.status(200).send({
            success: true,
            data: categories
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({
                success: false,
                message: "id is required.",
            });
            return;
        }
        const category = yield Category.update({ genre: "history" }, {
            where: {
                category_id: id
            }
        });
        res.status(200).send({
            message: "Category details updated successfully",
            success: true,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({
                success: false,
                message: "id is required.",
            });
            return;
        }
        const category = yield Category.destroy({
            where: {
                category_id: id
            }
        });
        res.status(200).send({
            message: "Category deleted successfully",
            success: true,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
