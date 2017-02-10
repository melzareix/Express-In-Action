var express = require('express');
var morgan = require('morgan');
var https = require('https');
var fs = require('fs');
var path = require('path');
var DarkSky = require('forecast.io');

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

var weather = new DarkSky({
    APIKey: 'cdd19e7f7123d5d85eca3b96c868d625'
});

var weatherOptions = {
    units: 'si'
};

app.use(morgan('dev'));
app.use('/static', express.static(path.resolve(__dirname, 'static')));

var httpsOptions = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
    requestCert: false,
    rejectUnauthorized: false
};


app.get('/', function (req, res) {
    res.render('index');
});

var regex = /^\/[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)\/[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)(?:\/)?$/;
app.get(regex, function (req, res) {
    var lng = req.params[0];
    var lat = req.params[3];

    weather.get(lat, lng, weatherOptions, function (err, response, data) {
        if (err) {
            console.log(err);
            res.status(500).json({
                'status': 'Error connecting to DarkSky'
            });
            return;
        }

        res.json({
            'temperature': data.currently.apparentTemperature,
            'timezone': data.timezone
        });
    });
});

app.use(function (req, res) {
    res.status(404).send("404 page not found.");
});

https.createServer(httpsOptions, app).listen(3000, function () {
    console.log('Server running on : https://localhost:3000');
});