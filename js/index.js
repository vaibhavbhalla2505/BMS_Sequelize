import express from 'express';
import { dbConnection, sequelize } from './config/dbConnect.js';
import authorRoute from './route/authorRoute.js';
import categoryRoute from './route/categoryRoute.js';
import bookRoute from './route/bookRoute.js';
import combineRoute from './route/combineRoute.js';
import bmsRoute from './route/bmsRoute.js';
import "./model/authorModel.js";
import "./model/bookModel.js";
import "./model/categoryModel.js";
import "./model/bookDataModel.js";
const app = express();
const PORT = 3000;
// Middleware to parse JSON
app.use(express.json());
app.use('/api/v1/author/', authorRoute);
app.use('/api/v1/category/', categoryRoute);
app.use('/api/v1/book/', bookRoute);
app.use('/api/v1/', combineRoute);
app.use('/api/v1/', bmsRoute);
sequelize.sync({ alter: true });
app.get('/', (req, res) => {
    res.send('hello');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    dbConnection();
});
