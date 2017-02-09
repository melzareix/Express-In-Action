// Part 01
var mustache = require('mustache');
var res = mustache.render('Hello, {{ first }} {{ second }}', {
    first: 'Steve',
    second: 'Jobs'
});

console.log(res);

// Part 02
var randomInt = require('./randomInt.js');
console.log(randomInt.randomInt);
console.log(randomInt.randomIntCustom(10));

// Part 03
var fs = require('fs');
fs.readFile('mytxt.txt', "utf-8", function (err, data) {
    if (err)
        throw err;
    console.log(data.match(/x/gi).length + ' X in the file.');
});

// Part 04
var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
    console.log("A new request to " + req.url);
    var path = url.parse(req.url);
    if (path.pathname == '/about')
        res.end('Ana baba yala');
    else
        res.end('Welcome to the Arena :""D');
});
server.listen(3000);
console.log('Server is running -> http://localhost:3000');
