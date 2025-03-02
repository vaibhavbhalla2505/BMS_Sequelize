var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Books } from "../model/bookDataModel.js";
import { sequelize } from "../config/dbConnect.js";
export const updateBookDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield sequelize.transaction();
    try {
        const ISBN = req.params.id;
        if (!ISBN) {
            yield transaction.rollback();
            console.log('rollback transaction');
            res.status(400).send({
                success: false,
                message: "ISBN is required",
            });
            return;
        }
        const book = yield Books.update({ isbn: "1234567898764", title: "harry potter" }, {
            where: {
                isbn: ISBN
            },
            transaction
        });
        yield transaction.commit();
        console.log('commit transaction');
        res.status(200).send({
            message: "Book details updated successfully",
            success: true,
            data: book,
        });
    }
    catch (error) {
        yield transaction.rollback();
        console.log('rollback transaction');
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield sequelize.transaction();
    try {
        const ISBN = req.params.id;
        if (!ISBN) {
            yield transaction.rollback();
            console.log('rollback transaction');
            res.status(400).send({
                success: false,
                message: "ISBN is required",
            });
            return;
        }
        const book = yield Books.destroy({
            where: {
                isbn: ISBN
            },
            transaction
        });
        yield transaction.commit();
        console.log('commit transaction');
        res.status(200).send({
            message: "Book details updated successfully",
            success: true,
            data: book,
        });
    }
    catch (error) {
        yield transaction.rollback();
        console.log('rollback transaction');
        res.status(500).send({
            success: false,
            error,
        });
    }
});
