import { DECIMAL, INTEGER, STRING } from "sequelize";
import { sequelize } from "../config/dbConnect.js";
import { Author } from "./authorModel.js";
import { Category } from "./categoryModel.js";
export const Book = sequelize.define('Books', {
    title: {
        type: STRING,
        allowNull: false
    },
    publication_date: {
        type: STRING,
        allowNull: false
    },
    price: {
        type: DECIMAL(10, 2),
        allowNull: false
    },
    isbn: {
        type: STRING,
        allowNull: false
    },
    author_id: {
        type: INTEGER,
        references: {
            model: Author,
            key: 'author_id'
        },
        onDelete: 'CASCADE'
    },
    category_id: {
        type: INTEGER,
        references: {
            model: Category,
            key: 'category_id'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});
Author.hasMany(Book, { foreignKey: 'author_id' });
Book.belongsTo(Author, { foreignKey: 'author_id' });
Category.hasMany(Book, { foreignKey: 'category_id' });
Book.belongsTo(Category, { foreignKey: 'category_id' });
