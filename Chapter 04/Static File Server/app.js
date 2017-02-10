var express = require('express');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

app.use(function (req, res, next) {
    var filePath = path.join(__dirname, 'static', req.url);
    fs.stat(filePath, function (err, fileInfo) {
        if (err || !fileInfo.isFile()) {
            next();
            return;
        }
        res.sendFile(filePath);
    });
});

app.use(function (req, res) {
    res.status(404).send('File Not Found!');
});

app.listen(3000, function () {
    console.log('Server running at http://localhost:3000');
});