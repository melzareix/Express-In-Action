var express = require('express');

var app = express();

app.get('/random/:min/:max', function (req, res, next) {
    var min = parseInt(req.params['min']);
    var max = parseInt(req.params['max']);
    if (isNaN(min) || isNaN(max)) {
        res.status(400).json({
            status: 'Bad request.'
        });
        return;
    }
    var number = Math.floor((Math.random() * (max - min)) + min);
    res.json({
        status: 'OK',
        number
    });
});

app.use(function (req, res) {
    res.status(404).json({
        status: '404 not found.'
    });
});

app.listen(3000, function () {
    console.log('Server running on : http://localhost:3000');
});