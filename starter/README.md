# Starter
The starter folder contains a basic Node.js express server that serves a simple Angular 2 application. The Angular 2 application queries data from an API exposed by the Node.js application; the data returned by the API is hard-coded.  The objective of this folder is to simply get familiar with the application.

## Install Node Modules
Before each step, we'll need to install all of our node dependencies.

In the `starter` folder, install all dependencies by typing:
```
npm install
```

## Start the Web Server
Go ahead and look around the source code.  When you're ready to start the application, in the `starter` folder, type:
```
npm start
```

This will compile the Angular 2 TypeScript and start the web server.  The listening port will be logged to the console (default is port 8080). Once you see the message that the web server is running, open a browser and visit the URL `http://localhost:8080` (replace 8080 with a different port if the console reports a different one). You should see the simple Angular 2 application of a list of books.  Clicking on a book will direct you to a page showing a little more details.