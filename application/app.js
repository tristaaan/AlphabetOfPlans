var express = require('express');
var database = require('./database').DataProvider;

var app = express();

// Configuration
app.configure( function() {

});

app.use(express.static(__dirname + '/../public'));

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/list/:id', function (req, res) {
    res.send("req id:" + req.params.id);
});

module.exports = app;