import {Request, Response, Router} from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.send({ message: 'Hello World' })
});

export default router;