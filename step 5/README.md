# Step 5. Convert API and Data Repository to TypeScript
The purpose of this step is to finish our Node.js vanilla Javascript-to-TypeScript conversion.  Additionally, we will move the hard-coded data to an external JSON file to mimic an external repository.

Out of all of the steps in this workshop, this is the most involved and will require the most refactoring. We will be refactoring our code over a few iterations so that you can comprehend what's going on.

## Add load-json-file Dependency
Because we will be moving our data to an external JSON file, we'll need a library that can parse the file.

In the `step 5` project foler, add sinon to the project:
```bash
npm i load-json-file --save
```

## Add load-json-file Types Declaration Dependency
We also need the types declaration file for load-json-file so that TypeScript won't give us any transpile errors.

In the `step 5` project foler, add sinon to the project:
```bash
npm i @types/load-json-file --save-dev
```

## Prepare for a New Repository
In the `step 5/app/data` folder, create a new folder named `json`.

## Move JSON Data to External File
In the `step 5/app/data/books.js` file you will find the `booksData` array.  

  1. Copy the _contents_ of the array (e.g. everything between the square brackets, **including the brackets**) to a new file, `step 5/app/data/json/data.json`.
  2. Inside the JSON file, replace all single quotes (for properties and values) with double quotes.
  3. Additionally, replace all `new Date()` instances with simply the date inside of the instantiation (i.e. `new Date('2015-08-20')` should be replaced with `"2015-08-20"`).
  4. Finally, remove the `booksData` array from the `step 5/app/data/books.js` file.

## Create an Interface
I won't go into the details about interfaces in TypeScript, but suffice it to say, while they are not transpiled to actual JavaScript, they are an essential part of the language.  We need to create an interface for our data layer, including the book model.

In the `step 5/app/data` folder, create a subfolder called `interfaces`.  Inside this folder, create a new file named `books.ts`.  In this file, place the following code:
```ts
export class Book {
    id: string;
    name: string;
    author: string;
    publishedDate: Date;
    cover: string;

    constructor() {}
}

export interface IBook {
    get(id: string): Promise<Book>;
    getAll(): Promise<Book[]>;
}
```

**Explanation:**
This file is responsible for two things: 1) a _model_ to describe our book object; and, 2) an _interface_, or contract, for all of our data layers.

## Create Concrete Data Layer Class
In the `step 5/app/data/json` folder, create a new file named `books.ts` and copy to following code into it:
```ts
import * as loadJsonFile from 'load-json-file';
import { Book, IBook } from '../interfaces/books';

export class Books implements IBook {
    constructor() { }

    public get(id: string): Promise<Book> {
        return new Promise<Book>((resolve, reject) => {
            loadJsonFile(__dirname + '/data.json').then((json) => {
                let found = json.filter((b: Book) => { return b.id == id; })[0];
                resolve(found);
            }).catch((e) => {
                reject(e);
            });
        });
    } 

    public getAll(): Promise<Book[]> {
        return new Promise<Book[]>((resolve, reject) => {
            loadJsonFile(__dirname + '/data.json').then((json) => {
                resolve(json);
            }).catch((e) => {
                reject(e);
            });
        });
    } 
}
```

**Explanation:**
  1. We are importing a reference to both objects, our model and interface, that we created in the previous step.
  2. We are creating a class that _implements_ our `IBook` interface.  Doing so requires that it contains the two methods `get` and `getAll`.
  3. Unlike our previous implementation of the data layer where each method returns a hard-coded array which is synchronous, we are now returning a _Promise_ which allows our application to run asynchronously.
  4. Each method reads the data directly from the 'data.json' file and returns the results.

## Delete the Old Data Layer
We no longer need the old data layer as it has now been replaced by our new one that implements `IBook` and reads the JSON from an external file.  Therefore, go ahead and safely delete `step 5/app/data/books.js`.

## Update Reference in the API
Change the first line of `step 5/app/api/books.js` to reference the new data layer as it is being transpiled and exposed by TypeScript:
```js
var Books = require('../data/json/books').Books;
```

## Update Reference in the API Unit Tests
Change the fourth line of `step 5/test/app/api/books.spec.js` to reference the new data layer:
```js
var Book = require('../../../app/data/json/books').Books;
```

## Reorganize Data Layer Unit Tests Folder Structure and Update Reference
Now that we've moved our data layer to a subfolder ('json'), let's do the same thing to our spec file. In `step 5/test/app/data` create a new folder called `json` and move the file `step 5/test/app/data/books.spec.js` into it.

**NOTE:** Because we will eventually _inject_ our data access layer into the application at runtime, we could _theoretically_ do the same for the unit test.  And, in this case, it may seem easy since we're dealing with static data files.  However, different data repositories require different mechanisms for CRUD operations - and possibly different ways to _describe_ the data within the repository (e.g. SQL vs. NoSQL) - and would require specifics around setup and teardown fixtures within our unit tests.  Therefore, its a good practice to have a different set of unit tests for each repository.

Change the second line of `step 5/test/app/data/json/books.spec.js` to reference the new data layer:
```js
var Books = require('../../../../app/data/json/books').Books;
```

## Compile and Test
Before we continue let's go ahead and test what we've done so far to make sure we're still on track.  In the `step 5` folder, type the following:
```bash
npm run tsc
npm test
```

If everything has been refactored successfully, you should see 7 passing tests.

## Create API Class
Let's now turn our attention to refactoring the API for TypeScript.

In the `step 5/app/api` folder, rename `books.js` to `booksController.ts`. Then, replace the content of the file with the following:
```ts
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
```

**Explanation:**
  1. We import the necessary object types from express to be used in TypeScript.
  2. We then create our two routes that call the data layer we implemented above.
  3. Notice that 'book' has been removed from the two URLs as we'll map that in the next step.

## Create API Routes Controller
To keep our project organized and our express application file clean, let's create a single, master API controller that will allow us to add API routes should we need to later.

In the `step 5/app/api` folder, create a new file named `index.ts`. Inside of this file, place the following code:
```ts
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
```

**Explanation:**
  1. All requests directed to the API, must start with '/api' in the URL as configured in the main express application.
  2. Any request to '/api/' is automatically dropped.
  2. Any request to '/api/books/ is sent to the `booksController` created in the previous step.

## Update _server.ts_
There's two small modifications we need to make to the `step 5/server.ts` file.

First, on line 7 (after the `import Config...` line), insert the following line:
```ts
import { ApiRoutesController } from './app/api';
```

Second, around line 28 or 29, you'll see the following:
```js
var bookRoutes = require('./app/api/books')(app, express);
app.use('/api', bookRoutes);
```

Replace those two lines with the following single line:
```ts
app.use('/api', ApiRoutesController);
```

## Rename API Unit Tests
Finally, let's change the file name to reflect our API filename changes. Rename `step 5/test/app/api/books.spec.js` to `booksController.spec.js`.  The great news is that there's no changes required for the actual unit tests themselves.

## Compile and Test
Congratulations! We're done refactoring our Node.js application. Let's make sure everything is working as expected. In the `step 5` folder, type the following:
```bash
npm run tsc
npm test
```

If everything has been refactored successfully, you should see 7 passing tests. If you see any errors, go through the steps again.  If not, run your the web application again by typing `npm start` and visiting the site in your browser.  You should see everything working as before.