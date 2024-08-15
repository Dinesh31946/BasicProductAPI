const mongoose = require('mongoose');

//create a  product schema
const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: [true, "Price must be provided"], 
    },
    featured: {
        type: Boolean, 
        default: true
    },
    rating: {
        type: Number, 
        default: 4.9,
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['Apple', 'Samsung', 'Dell', 'MI'],
            message: '{VALUE} is not a valid company'
        }
    }
});

productSchema.index({name: 'text', company: 'text'});

module.exports = mongoose.model('Product', productSchema);