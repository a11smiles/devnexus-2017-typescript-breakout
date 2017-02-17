var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

var app = express();
var config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var bookRoutes = require('./app/api/book')(app, express);
app.use('/api', bookRoutes);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});



app.listen(config.port);
console.log('Web server listening on port %s', config.port);
