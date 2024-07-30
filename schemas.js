const mongoose = require ('mongoose')

// Cargar variables de entorno desde .env
require('dotenv').config();

const productSchema = new mongoose.Schema({
    codigo:{
        type: Number,
        required: true,
        unique: true

    },
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true

    },
    categoria: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
