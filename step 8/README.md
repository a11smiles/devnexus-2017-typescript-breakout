# Step 8. Bonus: Add Named Dependencies
As a bonus, we'll add the capability to _dynamically_ switch between repositories via the URL.

As I stated at the end of step 7, we can programmatically determine which dependency is used.  In this bonus step, we are going to change repositories based on a URL parameter with the default being our JSON repository.

We are going to use a feature of Inversify called _named bindings_.  Named bindings allow us to tag, or name, difference bindings that implement the same interface.  In our case, we will have two named bindings - one for JSON and the other for XML.

## Add Named Bindings to Configuration
Open up `step 8/inversify.config.ts`, update the first binding and add the second binding so that they look like the following:
```ts
Kernel.bind<IBook>('IBook').to(BooksJSON).whenTargetNamed('json');
Kernel.bind<IBook>('IBook').to(BooksXML).whenTargetNamed('xml');
```

Basically, we are adding some constraints to our injected dependencies based on a named target.

## Update Controller for Dynamic Binding
We now need to modify our `booksController` to utilize the proper dependencies based on the URL parameter.  In step 7, we discussed how, in traditional JavaScript, constructor injection was _imitated_. In this step, we are going to accomplish true constructor injection with our InversifyJS IoC container.

Open `step 8/app/api/booksController.ts` file to begin.

### Add InversifyJS Dependencies
We need to import a few descriptors from the InversifyJS library along with reflect-metadata.

Insert the following two lines before the first line:
```ts
import 'reflect-metadata';
import { injectable, inject, named } from 'inversify';
```

### Make `booksController` _Injectable_
In step 7, _we_ instantiated a `booksController` instance in the API router.  Then, within the body of the constructor, we called on InversifyJS to return to us a concrete instance of `IBook`.  Technically speaking, this is just one more one-off permutation of "poor man's DI".  For true constructor injection, we need to allow the IoC container to instantiate our `booksController` and supply the needed dependencies as parameters to the constructor.  Therefore, we need to make `booksController` injectable, as well.

On the line immediately preceeding `export class BooksController {`, add the following descriptor:
```ts
@injectable()
```

### Inject Concrete Implementations of Both Data Layers
Replace the following line:
```ts
    private _books: IBook;
```
with:
```ts
    private _booksJson: IBook;
    private _booksXml: IBook;
```

Completely replace the constructor with the following:
```ts
    public constructor(
        @inject('IBook') @named('json') booksJson: IBook,
        @inject('IBook') @named('xml') booksXml: IBook,
    ) { 
        this._booksJson = booksJson;
        this._booksXml = booksXml;
    }
```

Again, we're going to allow the IoC container, InversifyJS in this case, to supply the necessary parameters.  Notice, however, that we are using our _named bindings_. The first parameter is of type `IBook` but with a target name of `json`; the second parameter is still of type `IBook` but with a target name of `xml`.  In other words, we are utilizing the binding constraints we defined earlier in our configuration.

### Add Helper Method
To reduce code and keep to our single responsibility paradigm, we need to create a helper method that, passed a parameter, returns the correct concrete data layer.

After the constructor, place the following code:
```ts
    private getRepo(repo?: string): IBook {
        if (repo == null || repo === undefined || repo === 'json')
            return this._booksJson;
        else if (repo === 'xml')
            return this._booksXml;
        else throw 'Repository not found.';
    }
```

So, if a `repo` parameter is _not_ passed (_null_ or _undefined_) or is 'json', we'll return the JSON repo.  If 'xml' is passed to the `repo` parameter, we'll return the XML repo.  Otherwise, if anything else is passed, we'll throw an error.

### Update Routes
Find the two lines below (one line in each route):
```ts
    this._books.getAll().then((bkArr) => {
    ...

    this._books.get(req.params.id).then((bk) => {
    ...
```

and replace them with the following two lines, respectively:
```ts
    this.getRepo(req.query.repo).getAll().then((bkArr) => {
    ...

    this.getRepo(req.query.repo).get(req.params.id).then((bk) => {
    ...
```

The two lines call our private method and pass in the querystring parameter `repo` if it's supplied.

**NOTE:** We've not focused on the Angular 2 app at all in this workshop.  However, if you take a look at the following three files, you'll see that everything is already wired in the Angular 2 app to support passing the querystring `repo` parameter through to the API.

  * `step 8/public/app/components/books-detail/books-detail.component.ts
  * `step 8/public/app/components/books-list/books-list.component.ts
  * `step 8/public/app/services/books-service.ts

## Add the Controller to the Kernel Configuration
Once again, open up `step 8/inversify.config.js` and insert the following line after line 2:
```ts
import { BooksController } from './app/api/booksController';
```

And, finally, insert the following line after the two bindings you added earlier:
```ts
Kernel.bind<BooksController>('BooksController').to(BooksController);
```

## Update the API router
Open `step 8/app/api/index.ts` and insert the following as the first line:
```ts
import Kernel from '../../inversify.config';
```

Then replace the following two lines:
```ts
let books = new BooksController();
router.use('/books', books.Router());
```
with the following:
```ts
let booksController = Kernel.get<BooksController>('BooksController');
router.use('/books', booksController.Router());
```

## Compile and Test
Let's make sure everything is working as expected. In the `step 8` folder, type the following:
```bash
npm run tsc
npm test
```

You should see our 10 passing tests.

## Dynamically Switching Dependencies
Running `npm start` should allow you to view the web application. By default, if you remember from above, the default repository will be our JSON books.  You can change that dynamically through appending a querystring to the end of the URL.

  * JSON:   
    http://localhost:8080  
    http://localhost:8080/?repo=  
    http://localhost:8080/?repo=json  
  * XML:  
    http://localhost:8080/?repo=xml

**IMPORTANT:** Keep in mind how a book is found once it is clicked on...the repository is filtered.  If you click on a JSON book, the URL becomes `http://localhost:8080/book/{some id}`, the JSON repository is searched and filtered, and the book is returned.  If you click on an XML book, the URL becomes `http://localhost:8080/book/{some id}` (the **same** as the JSON URL), the JSON repository is searched and filtered, and the book is **not found**.  Therefore, when clicking on an XML book, you'll need to manually add `?repo=xml` to the end of the URL so that the correct repository is searched and the book is returned.  Yes, I could have programmed this into the Angular 2 app, but in an attempt to keep the workshop as simple as possible, I elected not to do so.