# Step 7. Add Dependency Injection and Refactor
To this point, we've converted the entire application from JavaScript to TypeScript and have added unit tests.  We will now decouple the data layer and the service layer by introducing dependency injection.  By adding dependency injection, we can easily switch between our two repositories while requiring _very_ minimal refactoring.

## Switch to the XML Repository Manually
Before we get into dependency injection, let's look at the XML data through our web application.

Open the file `step 7/app/api/booksController.ts` and change the second line reference to our `books` JSON data layer to our XML data layer by updating the path:
```ts
import { Books } from '../data/xml/books';
```

Build and run the web application:
```bash
npm start
```

If everything compiles and runs correctly, then you should now see a list of XML-related books in our application.

## Traditional Constructor 'Injection'
You may be thinking at this point, "Big Deal".  I get it.  

Two things:

  1. As with every tightly-coupled application, we would need to update _everywhere_ we referenced the JSON data layer to now access the XML version.  In this application, that's only one place.  However, in a much larger application, that could be a problem.
  2. And, if we wanted to be creative, we theoretically _could_ import this dependecy through our constructor.  Typically, in traditional JavaScript, this is precisely what we would have done.  However, that's not very clean, ellegant, nor does it give us a lot of options for future growth (e.g. SOA, microservices, etc.). We need something a little more robust. Still, we would need to manually import the dependency through every instantiation of the data layer class. Again, too cumbersome.

Let's proceed with true dependecy injection the TypeScript way.

## Add InversifyJS
InversifyJS is an extremely powerful IoC container for TypeScript.  While it has a _ton_ of options, we're going to perform very simple dependency injection in our project.

In the `step 7` project folder, add InversifyJS to the project:
```bash
npm i inversify --save
```

## Create InversifyJS Configuration
As stated earlier, InversifyJS has many powerful capabilities.  However, I'm going to keep it simple for this workshop.

In the `step 7` project folder, create a new file named `inversify.config.ts` and paste the following into it:
```ts
import { Container} from 'inversify';
import { IBook } from './app/data/interfaces/books';

import { Books as BooksJSON } from './app/data/json/books' ;
import { Books as BooksXML }  from './app/data/xml/books';

let Kernel = new Container();
Kernel.bind<IBook>('IBook').to(BooksJSON);

export default Kernel;
```

Now, in the file `step 7/app/api/booksController.js`, we'll need to make some changes.

First, insert the following as the first line:
```ts
import Kernel from '../../inversify.config';
```

Next, change line 2 from:
```ts
import { Books } from '../data/json/books';
```
to:
```ts
import { IBook } from '../data/interfaces/books';
```

Second, change the begining of the class constructor from:
```ts
export class BooksController {

    public constructor() { }

    ...
```
to (and replace the constructor):
```ts
export class BooksController {
    private _books: IBooks;

    public constructor() { 
        this._books = Kernel.get<IBook>('IBook');
    }

    ...
```
