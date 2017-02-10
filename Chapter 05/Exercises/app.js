var express = require('express');
var app = express();

// 03
var apiRouter = require('./routes/api_router');
app.use('/api', apiRouter);

// 02
app.get('/users/:userid', function (req, res) {
    var userId = parseInt(req.params.userid);
    res.status(200).end(String(userId));
});

// 01
app.get('/olivia', function (req, res) {
    res.send('Hello, Olly');
});

app.use(function (req, res) {
    res.status(404).send('404 Not found.');
});

app.listen(3000, function () {
    console.log('Server running on http://localhost:3000');
});