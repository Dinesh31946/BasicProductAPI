require('dotenv').config();
const connectDb = require('./db/connection');
const Product = require('./models/productModel');
const ProductJson = require('./products.json');

const start = async () => {
    try {
        await connectDb(process.env.CONNECTION_STRING);
        await Product.create(ProductJson);
        console.log("Product created successfully");
    } catch (error) {
        console.log(error.message);
    }
}

start();