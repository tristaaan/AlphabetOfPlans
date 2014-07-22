var express = require('express');
var lessMiddleware = require('less-middleware');
var database = require('./database')('localhost', 27017);

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
    //res.send(database.getList(req.params.id));
    res.send("req id:" + req.params.id);
});

app.put('/list/new', function(req, res){
    database.save({
        alphabet: req.param('alphabet')
    }, function( error, docs) {
        res.redirect('/')
    });
});

module.exports = app;