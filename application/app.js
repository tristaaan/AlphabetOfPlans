var express = require('express');
var lessMiddleware = require('less-middleware');
var database = require('./database').DataProvider;

var app = express();
var publicDir = __dirname + "/../public";

// Configuration
app.configure( function() {
    app.use(lessMiddleware(publicDir));
    app.use(express.static(publicDir));
});

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/list/:id', function (req, res) {
    res.send("req id:" + req.params.id);
});

module.exports = app;