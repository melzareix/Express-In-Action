var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

var entries = [];
app.locals.entries = entries;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: 'false'
}));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/add-entry', function (req, res) {
    res.render('add-entry');
});

app.post('/add-entry', function (req, res) {
    var title = req.body.title;
    var body = req.body.body;
    if (!(title && body)) {
        res.status(400).send('Entries should have title and body.');
        return;
    }
    entries.push({
        title: title,
        published: new Date(),
        body: body
    });
    res.redirect('/');
});

app.use(function (req, res) {
    res.status(404).render('404');
});

app.listen(3000, function () {
    console.log('Listening at http://localhost:3000');
});