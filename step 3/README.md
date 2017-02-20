# Step 3. A Little House Cleaning
Before we begin our conversion from JavaScript to TypeScript, let's clean up our project a bit.

## Add Environment Variables for Mocha
You may have noticed, every time a server or API test runs, we get a couple of debugging messages. (Depending on your particular environment, this may not be the case. But, for most people it would be.)  This is because 1) we are using _morgan_, a request logger, to write HTTP requests to the console; and, 2) we are writing the listening port to the console.  Both of these are great if we are debugging our application.  However, for unit testing, both of these are causing needless noise. Let's disable them during our unit tests.

In the `step 3` folder, create a new file named `test.bootstrap.js` and add the following line to the file:
```
process.env.NODE_ENV = 'test';
```

With the `test.bootstrap.js` file, we're going to set some an environment variable that encapsulates our test run.

## Make Test Execution Easier
If you are tired of typing in the long command for running tests, we can also make that easier.

Open the file `step 3\package.json`.  Add a comma to the end of line 6 (line 6 begins with `"postinstall":...`). Then, insert a new line before the closing square bracket ("]") that contains the following:
```
"test": "mocha -r ./test.bootstrap.js ./test/**/*.spec.js"
```

(NOTE: The `-r ./test.bootstrap.js` tells Mocha to load our 'required' file.)

## Update _server.js_
There's two areas we need to update _server.js_.

First, around line 19, wrap `app.use(morgan('dev'));` with an _if-statement_ like so:
```
if (app.get('env') === 'development') {
    app.use(morgan('dev'));
}
```

Second, wrap the `console.log` method call on line 35 with the same like so:
```
if (app.get('env') === 'development') {
    console.log('Web server listening on port %s', config.port);
}
```

## Run Your Tests
Now, with our changes, running our tests is much easier and produces cleaner output.

In the `step 3` folder, type the following:
```
npm test
```
