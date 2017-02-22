import Kernel from '../../inversify.config';
import { Router, Request, Response } from 'express';
import { BooksController } from './booksController';

const router: Router = Router();

// /api
router.get('/', (req: Request, res: Response) => {
    res.end();
});

let booksController = Kernel.get<BooksController>('BooksController');
router.use('/books', booksController.Router());

export const ApiRoutesController: Router = router;