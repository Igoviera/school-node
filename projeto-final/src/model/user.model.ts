import mongoose, { Schema } from "mongoose";

export interface IsUser {
    name: string,
    email: string,
    password: string,
    createdAt: string | Date
}

export const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        minlength: [3, 'O nome deve ter pelo menos 3 caracteres'],
        maxlength: [30, 'O nome deve ter no máximo 30 caracteres'],
    },
    email: {
        type: String,
        required: [true, 'O e-mail é obrigatório'],
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatório'],
        minlength: [8, 'A senha deve ter pelo menos 8 caracteres'],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
})

export const User = mongoose.model('User', userSchema)