import { Request, Response, Router } from "express";
import productsService from "../services/products.service";

const router = Router();

router.get('/products', async (req: Request, res: Response) => {
    try {
        const products = await productsService.getAll()
        return res.send(products)
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
});

router.get('/product/:id', async (req: Request, res: Response) => {
    try {
        const product = await productsService.getByProduct(req.params.id)
        return res.status(200).send(product)
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
});

router.post('/cadastrar/product', async (req: Request, res: Response) => {
    try {
        await productsService.create(req.body)
        return res.status(201).send({ messge: 'Produto cadastrado com sucesso!' })
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
});

router.put('/update/product/:id', async (req: Request, res: Response) => {
    try {
        await productsService.update(req.params.id, req.body)
        return res.status(201).send({ messge: 'Produto atualizado com sucesso!' })
    } catch (error: any) {
        res.status(400).send({ error })
    }

});

router.delete('/remove/product/:id', async (req: Request, res: Response) => {
    try {
        await productsService.delete(req.params.id)
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }

});

export default router;