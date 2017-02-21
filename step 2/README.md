# Step 2. Add Unit Tests to the API and Data Repository
The purpose of this step is to add Mocha unit tests to the Node.js API and the data repository.

## Add Asynchronous Functionality
Currently, our API's data layer is synchronous - it simply returns a hard-coded array.  As you can imagine, this is not very practical as this is hardly ever the case in a real-world scenario.  So, before we begin unit testing our API and data layer, let's convert them to function asynchronously.  We will do this by using ES6 Promises.

Open `/step 2/app/data/books.js` and change the methods at the end of the file to look like the following:
```
Books.prototype.getAll = function () {
    return new Promise((resolve, reject) => {
        resolve(booksData);
    });
};

Books.prototype.get = function (id) {
    return new Promise((resolve, reject) => {
        var book = booksData.filter((b) => { return b.id == id; })[0];
        resolve(book);
    });
};
```

Now, instead of returning an array of book or a single book, we are returning a _promise_ of an array or book, respectively.

We also need to update the API to expect a promise from our data later. Open `/step 2/app/api/books.js` and change the two _get_ requests to the following:
```
    router.route('/books')

        .get(function (req, res) {
            var books = new Books();
            books.getAll().then((bkArr) => {
                res.json(bkArr);
            });
        });

    router.route('/books/:id')

        .get(function (req, res) {
            var books = new Books();
            books.get(req.params.id).then((bk) => {
                if (bk == null || bk === undefined) {
                    res.sendStatus(404);
                } else {
                    res.json(bk);
                }
            });
        });
```

With these changes, our API only returns data once the promise on the data layer has completed.

Go ahead and test the application to make sure it's running correctly.  Once you've determined that the changes are good, we can begin adding unit tests for the API and data layer.

## Add Sinon
Unit testing, as the name implies, is all about testing individual components, or units, of the application.  We focus on the specific functionality of the unit (i.e. class, method, function, etc.) rather than the integration as a whole.  In order to separate and test these units without their various dependencies, we'll need to _stub_ the dependencies.  Sinon provides various faking mechanisms to allow us to _stub_ out (e.g. fake) some of the functionality in our application.

In the `step 2` project foler, add sinon to the project:
```
npm i sinon @types/sinon --save-dev
```

## Add More Tests to the Project
Inside the `test` folder, we need to mimic the folder structure of the `app` folder so that we can easily organize our tests. So, let's also create the `api` and `data` subfolders.

### API Tests
In the `/step 2/test/app/api` folder, let's add a test specs file named `books.spec.js`.

In this file, add the following code:
```
var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('supertest');
var Books = require('../../../app/data/books');
var api = require('../../../app/api/books');

describe('API: books', function () {
    var server;
    var booksData;

    before(function () {
        booksData = [
            {
                id: '1',
                name: 'Sample Book 1',
                author: 'George Washington',
                publishedDate: new Date(),
                cover: 'blank.jpg'
            },
            {
                id: '2',
                name: 'Sample Book 2',
                author: 'Abraham Lincoln',
                publishedDate: new Date(),
                cover: 'blank.jpg'
            },
            {
                id: '3',
                name: 'Sample Book 3',
                author: 'Johnny Appleseed',
                publishedDate: new Date(),
                cover: 'blank.jpg'
            }
        ];
    });

    beforeEach(function (done) {
        delete require.cache[require.resolve('../../../server')];
        server = require('../../../server');
        done();
    });

    afterEach(function (done) {
        server.close(done);
    });


    describe('GET /books', function () {
        var getAllStub;

        before(function () {
            getAllStub = sinon.stub(Books.prototype, 'getAll', () => {
                return new Promise((resolve, reject) => {
                    resolve(booksData);
                })
            });
        });

        after(function () {
            getAllStub.restore();
        });

        it('should return a list of all books', function (done) {
            request(server).get('/api/books')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;

                    var bkArr = resp.body;
                    expect(bkArr).to.have.lengthOf(3);
                    done();
                });
        });
    });

    describe('GET /books/:id', function () {
        var getStub;

        before(function () {
            getStub = sinon.stub(Books.prototype, 'get', (id) => {
                return new Promise((resolve, reject) => {
                    var book = booksData.filter((b) => { return b.id == id; })[0];
                    resolve(book);
                })
            });
        });

        after(function () {
            getStub.restore();
        });

        it('should return a single book', function (done) {
            request(server).get('/api/books/1')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;

                    var bk = resp.body;
                    expect(bk).to.not.be.instanceOf(Array);
                    expect(bk.author).to.equal('George Washington');
                    done();
                });
        });

        it('should return null', function (done) {
            request(server).get('/api/books/5')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.be.empty;
                    done();
                });
        });
    });

});
```

**Explanation:**
  1. We have one large test suite and two smaller test suites.  The larger suite informs us that we are testing the _books_ API while the smaller two suites communicates which function of the API we are testing.
  2. The first smaller suite has one test fixture; the second suite has two test fixtures.
  3. Remember, we want to separate the API from the data repository, so we need to mock up some data.  This is where the `booksData` array comes in to play.  This is our sample data repository for the tests.
  4. At the beginning of each smaller suite, we use sinon to create a stub.  In other words, we are temporarily 'overriding' the concrete implementation with a fake one that returns our mocked data.  So, wherever these two data layer methods are called within our application (in this case, the API), these two stubs will be called instead.
  5. At the end of each smaller suite, we 'restore' the concrete methods.
  6. Finally, our 3 test fixtures test specific functionality of our API.

### Data Access Layer Tests
Testing the data access layer is important for testing any business logic in stored procedures or ORM queries.  This will be very basic first, however, in a later step, we'll add a little more complexity.

In the `/step 2/test/app/data` folder, let's add another test specs file.  Again, we'll name it `books.spec.js`.

In the file, add the following code:  
```
var expect = require('chai').expect;
var Books = require('../../../app/data/books');

describe('DATA (json): books', function () {

    describe('getAll', function () {
        it('should return a list of all books', function (done) {
            var books = new Books();
            books.getAll().then((bkArr) => {
                expect(bkArr).to.be.instanceOf(Array);
                expect(bkArr).to.have.lengthOf(10);
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

    describe('get', function () {
        it('should return a single book', function (done) {
            var books = new Books();
            books.get('1491929480').then((bk) => {
                expect(bk).to.not.be.instanceOf(Array);
                expect(bk.author).to.equal('Lindsay Bassett');
                done();
            }).catch((e) => {
                done(e);
            });
        });

        it('should return null', function (done) {
            var books = new Books();
            books.get('5').then((bk) => {
                expect(bk).to.be.undefined;
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

});
```

**NOTE:** Keep in mind here that we're, again, unit testing the data access layer.  Therefore, we're working with data that's 'stored' in the repository.  If this was a real application, we'd populate the repository with a _beforeEach_ function and purge the repository with a _afterEach_ function before and after each test fixture, respectively.  Since our data is hard-coded, there's no need in our case.

## Run Your Tests
In the `step 2` folder, type the following:
```
node_modules/.bin/mocha test/**/*.spec.js
```

If everything runs correctly, you should see that all 7 (1 from the server, 3 for the API, 3 for the data layer) tests passed.