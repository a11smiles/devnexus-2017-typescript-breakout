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

Let's proceed with true dependency injection the TypeScript way.

## Add InversifyJS and reflect-metadata
InversifyJS is an extremely powerful IoC container for TypeScript.  While it has a _ton_ of options, we're going to perform very simple dependency injection in our project.

Additionally, in some environments, reflect-metadata may not be required.  However, for safety, let's go ahead and add it.

In the `step 7` project folder, add InversifyJS to the project:
```bash
npm i inversify reflect-metadata --save
```

## Implement Dependency Injection
We're now going to fully implement the dependency injection.  Looking below, you may think it's a lot of steps.  However, you'll be surprised on how easy it is.

### Create InversifyJS Configuration
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

### Import InversifyJS Configuration
Now, in the file `step 7/app/api/booksController.js`, we'll need to make some changes.

First, insert the following as the first line:
```ts
import Kernel from '../../inversify.config';
```

### Reference the Abstract Interface
Next, change line 2 from:
```ts
import { Books } from '../data/json/books';
```
to:
```ts
import { IBook } from '../data/interfaces/books';
```

### Instantiate Concrete Class from IoC Container
Change the begining of the class constructor from:
```ts
export class BooksController {

    public constructor() { }

    ...
```
to (and replace the constructor):
```ts
export class BooksController {
    private _books: IBook;

    public constructor() { 
        this._books = Kernel.get<IBook>('IBook');
    }

    ...
```

### Update References
Because the concrete class is now instantiated in the constructor, we no longer need to do it in the routes. Therefore, remove the two lines (one in each route):
```ts
var books = new Books();
```

Then, on the very next line (after the two lines you removed), updated the `books` reference to:
```ts
this._books.getAll().then((bkArr) => { ...

this._books.get(req.params.id).then((bk) => { ...
```

### Make Concrete Classes 'Injectable'
We now need to make both of our concrete classes (JSON and XML) injectable.

Open up both `step 7/app/data/json/books.ts` _and_ `step 7/app/data/xml/books.ts` and:

  1. Before the first line, insert the following 2 lines:

  ```tsc
  import 'reflect-metadata';
  import { injectable } from 'inversify';
  ```
  2. Before the `class` declaration line, insert the following descriptor:

  ```tsc
  @injectable()
  ```

**Explanation:**
  1. We first created a configuration file for InversifyJS.  This configuration file maps concrete implementations to interfaces.  This allows us to reference these bound concrete classes later throughout our code while simply providing a promise at the moment.  InversifyJS's web site typically demonstrates doing this through symbols.  Again, I wanted to keep this as simple as possible and, with the exception of the necessary reflect-metadata, wanted to eliminate polyfills as much as possible from our demo.
  2. We then reference this configuration everywhere we need to _inject_ our dependency.  In our case, it's the `booksController`. 
  3. Because we could, at any time, change out the concrete implementation of our books repository, we are simply going to reference a _promise_ of a books repository by providing the interface.
  4. In the constructor, we reference the instantiated instance of our concrete class that was created by our IoC container and update our API to use the methods from that instance.
  5. Finally, we inform InversifyJS that our concrete classes are injectable and provide a reference to reflect-metadata so that InversifyJS can properly perform reflection.

## Compile and Test
Let's make sure everything is working as expected. In the `step 7` folder, type the following:
```bash
npm run tsc
npm test
```

You should now see 10 passing tests.

Running `npm start` should allow you to view the web application (with the JSON books).

## Switch the Dependency
Now, instead of opening and editing multiple files, we only need to edit our configuration file to switch repositories.

Open `step 7/inversify.config.js` and change the binding (line 8) from `BooksJSON` to `BooksXML`.

Running `npm start` should now allow you view the web application, but this time with the XML books.

## Finished
Congratulations! You have now implemented dependency injection into your Node.js application.  

Keep in mind that the `inversify.config.js` can programmatically change dependencies based on certain conditions (e.g. configuration files, envrionments, etc.).