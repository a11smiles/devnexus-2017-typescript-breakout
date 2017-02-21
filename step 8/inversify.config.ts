import { Container} from 'inversify';
import { IBook } from './app/data/interfaces/books';

import { Books as BooksJSON } from './app/data/json/books' ;
import { Books as BooksXML }  from './app/data/xml/books';

let Kernel = new Container();
Kernel.bind<IBook>('IBook').to(BooksXML);

export default Kernel;