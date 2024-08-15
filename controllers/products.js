const { lutimes } = require("fs");
const connectDb = require("../db/connection");
const Product = require('../models/productModel');


const getAllProducts = async (req, res) => {

    try {
        const {company, name, featured, sort, select, page = 1, limit = 10} = req.query;
        const queryObject = {};

        if(company){
            queryObject.company = {$regex: company, $options: 'i'};
        }
        if(name){
            queryObject.name = {$regex: name, $options: 'i'}
        }
        if(featured){
            queryObject.featured = featured;
        }
        console.log(queryObject);

        let apiData = Product.find(queryObject);

        if(sort){
            let sortFix = sort.replace(",", " ");
            apiData = apiData.sort(sortFix);
        }

        if(select){
            let selectFix = select.replace(",", " ");
            apiData = apiData.select(selectFix);
        }

        const skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);

        const Products = await apiData;
        res.status(200).json({Products, totalProducts: Products.length});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" });        
    }
}

const getAllProductsTesting = async (req, res) => {
    const searchTerm = req.query;

    const data = await Product.find(searchTerm);

    if(data){
        res.status(200).json(data);
    }else{
        res.status(400).json({error: "Internal Server Error"});
    }
}

module.exports = {
    getAllProducts,
    getAllProductsTesting
};