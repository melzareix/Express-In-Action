var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.use(function (req, res, next) {
    console.log(new Date() + ' ' + req.url);
    next();
});

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