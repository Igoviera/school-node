import mongoose, { Schema } from "mongoose";

export const cartSchema = new Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
    }],
    qtd: {
        type: Number,
        default: 0
    },
    valorTotal: {
        type: Number,
        default: 0
    }
})

export const Cart = mongoose.model('Cart', cartSchema)