import { DECIMAL, STRING } from "sequelize";
import { sequelize } from "../config/dbConnect.js";
export const Books = sequelize.define('BookData', {
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
    genre: {
        type: STRING,
        allowNull: false
    },
    author_name: {
        type: STRING,
        allowNull: false
    }
}, {
    timestamps: false
});
