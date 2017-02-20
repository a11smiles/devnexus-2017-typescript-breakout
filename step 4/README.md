# Step 4. Convert _server.js_ to TypeScript and Update Unit Tests
Now that unit tests have been added to the Node.js application, we'll begin coverting the application to TypeScript and update the corresponding unit tests.  The first refactoring is the express application.

There's two parts of the application that need to be updated to TypeScript for the server.

## Change _config.js_
_config.js_ currently exports a generic object.  We need to convert the object to a more formal class. First, rename _config.js_ to _config.ts_. Second, refactor the code in the configuration file to the following:
```
export default class Config {
    public port: number;

    constructor() {
        this.port = process.env.PORT || 8080;
    }
}
```

## Update References in _server.js_
There's really not much to change in the express application.  We simply need to update some references, or rather, how we import those references. First, like the _config.js_ in the previous step, rename _server.js_ to _server.ts_.  Second, we need to refactor the references and the instantiations of our express application and configuration class.

Replace the first 7 lines:
```
var bodyParser = require('body-parser'),
    express = require('express'),
    morgan = require('morgan'),
    path = require('path');

var app = express();
var config = require('./config');
```

with:
```
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as bodyParser from 'body-parser';

import Config from './config';

const app: express.Application = express();
let config = new Config();
```

**Explanation:**
  1. We are creating a constant of our express application.  This is a deep immutable object that, in our case, will be globally scoped.
  2. We instantiate a configuration object of which we'll reference the `port` property later.