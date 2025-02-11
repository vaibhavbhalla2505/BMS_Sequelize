import { INTEGER, STRING } from "sequelize";
import { sequelize } from "../config/dbConnect.js";
export const Category = sequelize.define('Categories', {
    category_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    genre: {
        type: STRING,
        allowNull: false
    },
}, {
    timestamps: false
});
