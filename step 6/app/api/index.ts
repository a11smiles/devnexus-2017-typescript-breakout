import { Router, Request, Response } from 'express';
import { BooksController } from './booksController';

const router: Router = Router();

// /api
router.get('/', (req: Request, res: Response) => {
    res.end();
});

let books = new BooksController();
router.use('/books', books.Router());

export const ApiRoutesController: Router = router;