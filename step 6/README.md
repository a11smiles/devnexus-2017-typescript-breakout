# Step 6. Create Second Repository (XML) and Add Unit Tests
We'll start by properly creating our unit tests to test a secondary repository.  We will then create the secondary 'repository' that contains the data in an XML file to mimic a different repository type.  

## Create Unit Tests for XML
As all good developers do, we'll start off by creating our unit tests first. Lucky for us, because both respositories are static files and we're only reading information from those files, there's not much refactoring we need to do.

Copy `step 6/test/app/data/json` (and it's contents) to a new folder `step 6/test/app/data/xml`.

Then, on the second line of `step 6/text/app/data/xml/books.spec.js`, change the path to:
```
var Books = require('../../../../app/data/xml/books').Books;
```

Then, change the main test suite description from 'DATA (_json_): books' to 'DATA (_xml_): books'.

Finally, the second unit test (e.g. "_should return a single book_") was set to test a record from our JSON data. We need to update it to test for an XML record.  Change the:

  * _id_ from `1491929480` to `1491915102` 
  * _author_ from `Lindsay Bassett` to `Priscilla Walmsley`

Of course, if you compiled and ran the tests at this point, you would receive an error as `step 6/app/data/xml/books.js` does not yet exist.  Let's create that now.

## Create XML Data Layer Stub
Create a new file named `step 6/app/data/xml/books.ts` and paste the following code into it:
```
import { Book, IBook } from '../interfaces/books';

export class Books implements IBook {
    constructor() { }

    public get(id: string): Promise<Book> {
        throw 'Not Implemented';
    } 

    public getAll(): Promise<Book[]> {
        throw 'Not Implemented';
    } 
}
```

Now, compiling and running the tests will show 3 failing tests.

## Add xml2js
To read our external XML file, we're going to need an additional dependency. xml2js will read our XML data and convert it to usable JSON for us.

In the `step 6` project folder, add xml2js and it's types definition to the project:
```
npm i xml2js --save
npm i @types/xml2js --save-dev
```

## Complete the XML Data Layer
Before the first line of `step 6/app/data/xml/books.ts` insert the following 2 lines:
```
import * as fs from 'fs';
import * as xml2js from 'xml2js';
```

To adhere to the 'single responsibility' rule of SOLID design principles let's create two private utility methods that will: 1) read the XML file (`readBooks()`); and, 2) convert the XML data to a JSON array of book objects (`formatData()`).

Add these two methods after the constructor, inside of our `Books` class:
```
    private readBooks(): Promise<Book[]> {
        return new Promise<Book[]>((resolve, reject) => {
            fs.readFile(__dirname + '/data.xml', (err, data) => {
                if (err) reject(err);
                else {
                    let parser = new xml2js.Parser();
                    
                    parser.parseString(data, (err: any, result: any) => {
                        if (err) reject(err);
                        else {
                            let formatted = this.formatData(result);
                            resolve(formatted);
                        }
                    });
                }
            })
        });
    }

    private formatData(data: any): Book[] {
        let books: Book[] = [];

        data.books.book.forEach((el: any) => {
            let book: Book = new Book();
            book.id = el["$"].id;
            book.name = el.name[0];
            book.author = el.author[0];
            book.publishedDate = new Date(el.publishedDate[0]);
            book.cover = el.cover[0];
            books.push(book);
        })

        return books;
    }
```

Now we're ready to implement the `get` and `getAll` methods with the following code:
```
    public get(id: string): Promise<Book> {
        return new Promise<Book>((resolve, reject) => {
            this.readBooks().then((data) => {
                let found = data.filter((b: Book) => { return b.id == id; })[0];
                resolve(found);
            }).catch((e) => {
                reject(e);
            })
        });
    } 

    public getAll(): Promise<Book[]> {
        return new Promise<Book[]>((resolve, reject) => {
            this.readBooks().then((data) => {
                resolve(data);
            }).catch((e) => {
                reject(e);
            })
        });
    } 
```

 You'll notice that with the exception of our two helper methods, our XML data layer is very similar to our JSON data layer.

## Compile and Test
We've not yet added the XML repository to our web application; we'll do that in the next step.  However, let's make sure everything is working as expected. In the `step 6` folder, type the following:
```
npm run tsc
npm test
```

You should now see 10 passing tests.