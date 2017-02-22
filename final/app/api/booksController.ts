import 'reflect-metadata';
import { injectable, inject, named } from 'inversify';
import Kernel from '../../inversify.config';
import { Router, Request, Response } from 'express';
import { IBook } from '../data/interfaces/books';

const router: Router = Router();

@injectable()
export class BooksController {
    private _booksJson: IBook;
    private _booksXml: IBook;

    public constructor(
        @inject('IBook') @named('json') booksJson: IBook,
        @inject('IBook') @named('xml') booksXml: IBook,
    ) { 
        this._booksJson = booksJson;
        this._booksXml = booksXml;
    }

    private getRepo(repo?: string): IBook {
        if (repo == null || repo === undefined || repo === 'json')
            return this._booksJson;
        else if (repo === 'xml')
            return this._booksXml;
        else throw 'Repository not found.';
    }

    public Router(): Router {

        router.route('/')

            .get((req: Request, res: Response) => {
                this.getRepo(req.query.repo).getAll().then((bkArr) => {
                    res.json(bkArr);
                });
            });

        router.route('/:id')

            .get((req: Request, res: Response) => {
                this.getRepo(req.query.repo).get(req.params.id).then((bk) => {
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