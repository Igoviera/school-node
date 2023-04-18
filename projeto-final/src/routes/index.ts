import { Router } from 'express';
import products from './products.router';
import user from './user.router';
import cart from './cart.router';

const router = Router();

router.use('/',user, products, cart);


export default router;