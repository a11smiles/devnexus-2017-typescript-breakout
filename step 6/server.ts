import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as bodyParser from 'body-parser';

import Config from './config';
import { ApiRoutesController } from './app/api';

const app: express.Application = express();
let config = new Config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

if (app.get('env') === 'development') {
    app.use(morgan('dev'));
}

app.use(express.static(__dirname + '/public'));

app.use('/api', ApiRoutesController);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});



var server = app.listen(config.port, () => {
    if (app.get('env') === 'development') {
        console.log('Web server listening on port %s', config.port);
    }
});

module.exports = server;