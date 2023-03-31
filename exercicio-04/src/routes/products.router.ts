import { Request, Response, Router } from "express";
import productsService from "../services/products.service";

const router = Router();

router.get('/products', (req: Request, res: Response) => {
    const products = productsService.getAll()
    return res.send(products)
});

router.get('/product/:id', (req: Request, res: Response) => {
    const product = productsService.getById(req.params.id)
    if(!product){
        return res.status(400).send({message:'Produto não encontrado!'})
    }
    return res.status(200).send(product)
});

router.post('/cadastrar/product', (req: Request, res: Response) => {
    productsService.create(req.body)
    return res.status(201).send({ messge: 'Produto cadastrado com sucesso!' })
});

router.put('/update/product/:id', (req: Request, res: Response) => {
    try {
        const result = productsService.update(req.params.id, req.body)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(200).send({ message: error.message })
    }

});

router.delete('/remove/product/:id', (req: Request, res: Response) => {
    try {
        const result = productsService.delete(req.params.id)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(200).send({ message:error.message})
    }

});

export default router;