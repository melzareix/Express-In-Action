var express = require('express');
var logger = require('morgan');
var path = require('path');

var app = express();
app.use(logger('common'));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        message: 'Welcome to the arena.'
    });
});

app.get('/hello/:who', function (req, res) {
    var name = req.params['who'];
    res.end('Hello, ' + name + '.');
});

app.use(function (req, res, next) {
    var mns = (new Date()).getMinutes();
    if (mns % 2 == 0) {
        next();
    } else {
        res.statusCode = 403;
        res.end('Not authorized to enter.');
    }
});

app.use(function (req, res) {
    res.end('You accessed the secret.');
});


app.listen(3000);
console.log('Server running on port 3000 -> http://localhost:3000');