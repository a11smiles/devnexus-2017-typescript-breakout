var bodyParser = require('body-parser')
express = require('express'),
    morgan = require('morgan'),
    path = require('path');

var app = express();
var config = require('./config');

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

var bookRoutes = require('./app/api/book')(app, express);
app.use('/api', bookRoutes);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});



var server = app.listen(config.port, () => {
    if (app.get('env') === 'development') {
        console.log('Web server listening on port %s', config.port);
    }
});

module.exports = server;