import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import cartRepository from "../repositories/cart.repository"
import productRepository from "../repositories/product.repository";

class CartServices {

    async addproductCart(cartId: string, productId: string) {
        const cart = await cartRepository.cartById(cartId)
        if (!cart) {
            throw new Error('Carrinho não encontrado')
        }

        const product = await productRepository.getByProduct(productId)
        if (!product) {
            throw new Error('Produto não encontrado')
        }

        const updateCart = await cartRepository.addproductCart(cartId, productId)
        return updateCart
    };

    async cartById(id: string) {
        const cartId = await cartRepository.cartById(id)
        
        if (!cartId) {
            throw new Error('Carrinho não encontrado')
        }
        return cartId
    };

    async removeProductCart(productId: string, cartId: string) {
        const cart = await cartRepository.cartById(cartId)
        if (!cart) {
            throw new Error('Carrinho não encontrado')
        }

        const productIdObj = new ObjectId(productId)

        const productIndex = cart.products.find(p => p._id.equals(productIdObj));

        if (!productIndex) {
            throw new Error('Produto não encontrado no carrinho')
        }

        const remove = await cartRepository.removeProductCart(productId, cartId)
        return remove
    }
}

export default new CartServices();