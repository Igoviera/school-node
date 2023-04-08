import { Router } from 'express';
import helloWorld from './helloWorld.router';
import products from './products.router';

const router = Router();

router.use('/api', helloWorld, products);


export default router;