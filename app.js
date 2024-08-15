require('dotenv').config();
const express = require('express');
const products_route = require('./routes/products');
const connectDb = require('./db/connection');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, Developer Dinesh Wassup');
});

app.use('/api/products', products_route);

const start = async () => {
    try {
        await connectDb(process.env.CONNECTION_STRING);
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
}

start();