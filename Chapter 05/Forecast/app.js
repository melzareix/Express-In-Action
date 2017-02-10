var express = require('express');
var https = require('https');
var fs = require('fs');

var app = express();

var httpsOptions = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
    requestCert: false,
    rejectUnauthorized: false
};

https.createServer(httpsOptions, app).listen(3000, function () {
    console.log('Server running on : https://localhost:3000');
});