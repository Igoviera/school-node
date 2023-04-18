import mongoose, { Schema } from "mongoose";

export interface ISProduct {
    nameProduct: string;
    description: string;
    img: string;
    quantity: number;
    price: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export const productSchema = new Schema<ISProduct>({
    nameProduct: {
        type: String,
        require: [true, 'O nome é obrigatorio']
    },
    description: {
        type: String,
        required: [true, 'O campo description é obrigatório'],
    },
    img: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'O campo price é obrigatório'],
    },
    quantity: {
        type: Number,
    },
    category: {
        type: String,
        require: [true, 'A categoria é obrigatoria'],
        minlength: [2, 'O nome deve ter pelo menos 3 caracteres'],
        maxlength: [30, 'O nome deve ter no máximo 30 caracteres'],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
})

export const Product = mongoose.model<ISProduct>('Product', productSchema)