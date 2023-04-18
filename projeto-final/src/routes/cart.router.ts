import { Request, Response, Router } from "express";
import cartService from "../services/cart.service";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post('/cart/add/:cartId/:productId', auth, async (req: Request, res: Response) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId
        const updateCart = await cartService.addproductCart(cartId, productId)
        res.status(200).send(updateCart)

    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
});

router.get('/cart/:id', auth, async (req: Request, res: Response) => {
    try {
        const cart = await cartService.cartById(req.params.id)
        res.status(200).send(cart)
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
});

router.delete('/cart/product/remove/:cartId/:productId', auth, async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId
        const cartId = req.params.cartId
        const removeProduct = await cartService.removeProductCart(productId, cartId)
        res.status(200).send(removeProduct)

    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
})

export default router;