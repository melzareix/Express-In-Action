var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'static')));

app.use(function (req, res) {
    res.status(404).send('File Not Found!');
});

app.listen(3000, function () {
    console.log('Server running at http://localhost:3000');
});