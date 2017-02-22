import { Container} from 'inversify';
import { IBook } from './app/data/interfaces/books';
import { BooksController } from './app/api/booksController';

import { Books as BooksJSON } from './app/data/json/books' ;
import { Books as BooksXML }  from './app/data/xml/books';

let Kernel = new Container();
Kernel.bind<IBook>('IBook').to(BooksJSON).whenTargetNamed('json');
Kernel.bind<IBook>('IBook').to(BooksXML).whenTargetNamed('xml');
Kernel.bind<BooksController>('BooksController').to(BooksController);

export default Kernel;