import { Router } from 'express';
import helloWorld from './helloWorld.router';
import products from './products.roter';

const router = Router();

router.use('/api', helloWorld, products);


export default router;