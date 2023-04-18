import { Cart } from "../model/cart.model";
import { ISProduct, Product } from "../model/products.model";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

class CartRepository {

    async addproductCart(cart: string, product: string) {
        const cartObj = await Cart.findById(cart)
        if (!cartObj) {
            throw new Error('Carrinho não encontrado')
        }

        const productObj = await Product.findById(product)
        if (!productObj) {
            throw new Error('Produto não encontrado')
        }

        cartObj.products.push(productObj._id)

        cartObj.qtd = 0    
        cartObj.valorTotal = 0

        for (const product of cartObj.products) {
            const productObj = await Product.findById(product)
            if (!productObj) {
                throw new Error('Produto não encontrado')
            }
            cartObj.valorTotal += productObj.price
            cartObj.qtd += 1
        }

        await cartObj.save()
        return cartObj
    };

    async cartById(cartId: string) {
        return await Cart.findById({ _id: cartId }).populate("products")
    };

    async removeProductCart(productId: string, cartId: string) {
        const cart = await Cart.findById(cartId).populate('products')
        if(!cart){
            throw new Error('Carrinho não encontrado')
        }

        const productIndex = cart.products.findIndex((p) => {
            return p._id.equals(new ObjectId(productId)) 
        })

        if(productIndex === -1){
            throw new Error('Produto não encontrado')
        }

        const removeProduct = cart.products[productIndex]as unknown as ISProduct
        cart.valorTotal -= removeProduct.price 
        cart.qtd -= 1
        cart.products.splice(productIndex, 1)

        const updateCart = await cart.save()

        return updateCart

    }
}

export default new CartRepository();