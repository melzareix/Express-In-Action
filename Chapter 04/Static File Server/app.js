var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'static'), {
    fallthrough: false
}));

app.use(function (req, res, err, next) {
    console.error(err);
    next();
});

app.use(function (req, res) {
    res.status(404).send('File Not Found!');
});

app.listen(3000, function () {
    console.log('Server running at http://localhost:3000');
});