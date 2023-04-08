import mongoose, { Schema } from "mongoose";

export const productSchema = new  Schema({
    description: {
        type: String,
        required: [true, 'O campo description é obrigatório'],
    },
    img:{
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'O campo price é obrigatório'],
    },
    quantity: {
        type: Number,
        required: [true, 'O campo quantity é obrigatório'],
    }
})

export const Product = mongoose.model('Product', productSchema)