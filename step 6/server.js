"use strict";
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var bodyParser = require("body-parser");
var config_1 = require("./config");
var api_1 = require("./app/api");
var app = express();
var config = new config_1.default();
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
app.use('/api', api_1.ApiRoutesController);
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
var server = app.listen(config.port, function () {
    if (app.get('env') === 'development') {
        console.log('Web server listening on port %s', config.port);
    }
});
module.exports = server;
//# sourceMappingURL=server.js.map