import { Router, Request, Response } from 'express';
import { Books } from '../data/json/books';

const router: Router = Router();

export class BooksController {

    public constructor() { }

    public Router(): Router {

        router.route('/')

            .get((req: Request, res: Response) => {
                var books = new Books();
                books.getAll().then((bkArr) => {
                    res.json(bkArr);
                });
            });

        router.route('/:id')

            .get((req: Request, res: Response) => {
                var books = new Books();
                books.get(req.params.id).then((bk) => {
                    if (bk == null || bk === undefined) {
                        res.sendStatus(404);
                    } else {
                        res.json(bk);
                    }
                });
            });

        return router;
    }
}