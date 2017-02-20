# Step 1. Add Unit Tests to _server.js_
In this step, we add unit tests to the express application to begin our server-side testing.

There are a number of good unit testing frameworks out there; Mocha is one of those frameworks.  Until Angular 2 RC 5, Mocha even worked well with Angular 2. However, at the time of this writing, Angular 2 is only compatible with Jasmine.  We will still use Mocha, though, to test our server-side code.

## Install Node Modules
Reminder, before each step, we'll need to install all of our node dependencies.

In the `step 1` folder, install all dependencies by typing:
```
npm install
```

## Add Mocha and Chai to the Project
We need to add the Mocha and Chai libraries to our project first.  Additionally, we need to add the typings for the libraries to help us with type resolution when we move to TypeScript.

In the `step 1` folder, add the required libraries to the project by typing the following command:
```
npm i mocha chai @types/mocha @types/chai --save-dev
```

## Add Supertest
For testing the API (and general requests against the server), we're going to need to mock, or simulate, an HTTP request.  Supertest is a library that allows us to do just that.

In the project folder, add Supertest to the project by typing the following command:
```
npm i supertest --save-dev
```

## Prepare _server.js_ For Testing
Currently, _server.js_ runs just fine for serving our web application. However, it's not really optimal for testing.  We need to make a small addition to the file to allow for testing.  Specifically, we need to _export_ the server instance.

Open up _server.js_ and scroll down to the end of the file.

Change the last few lines from this:
```
app.listen(config.port);
console.log('Web server listening on port %s', config.port);
```
to this:
```
var server = app.listen(config.port, () => {
    console.log('Web server listening on port %s', config.port);
});

module.exports = server;
```

`app.listen` returns an instance of the running server object.  We will export that object for our testing.

## Add Tests to the Project
Let's start by adding a `test` folder in the top folder structure (the 'top' folder is the step's folder). 

### Server Tests
In the `step 1/test/` folder, let's add a test specifications file. In large applications, it's customary to give the file a name that signifies library it's testing. So, let's name it `server.spec.js`.

In the `server.spec.js` add the following code:
```
var request = require('supertest');
var expect = require('chai').expect;

describe('loading express', function() {
    var server;

    beforeEach(function(done) {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
        done();
    });

    afterEach(function(done) {
        server.close(done);
    });

    it('responds to /', function(done) {
        request(server).get('/')
            .expect(200, (err, resp) => {
                expect(resp.header['content-type']).to.equal('text/html; charset=UTF-8');
                expect(resp.header['access-control-allow-origin']).to.equal('*');
                expect(resp.header['access-control-allow-methods']).to.equal('GET,POST');
                expect(resp.header['access-control-allow-headers']).to.equal('X-Requested-With,content-type,Authorization');
                done();
            });
    });

});
```

**Explanation:**
  1. We first import _supertest_ and _chai_ - our Mocha testing library.
  2. Using _describe_, we create our first test _suite_.  We're classifying all tests in this suite as having something to do with 'loading express'.
  3. We have also created one test _fixture_.  The text fixture responds to a simple web request at the main URI making sure that the web server responds. NOTE: This won't test for content of the loaded page very well as, we mentioned before, Angular 2 no longer supports Mocha tests.
  4. **Important:** The biggest thing to note here is the two functions _beforeEach_ and _afterEach_.  The problem with unit testing web requests is the issue of _shared sessions_, or remnants of objects left over from previous requests.  In unit testing, we do not want any data shared between the tests - we need a barrier so that all tests act independently of each other.  The _beforeEach_ acts as a 'setup' for each test fixture.  It deletes any previous references to the express server and reloads it, essentially destroying any existing session information.  The _afterEach_ acts as a 'teardown' for each test fixture and closes any server connections before moving to the next test.

## Run Your Test
In the `step 1` folder, type the following:
```
node_modules/.bin/mocha test/**/*.spec.js
```

This will recursively find and run all test spec's in the `test` folder.

If everything runs correctly, you should see that our single test passed.