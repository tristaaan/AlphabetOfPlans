var express = require('express');
var path = require('path');
var lessMiddleware = require('less-middleware');
var DataProvider = require('./database').DataProvider;

var app = express();
var publicDir = __dirname + "/../public";

var host = process.env.HOST;
var port = process.env.PORT;
var dbname = process.env.DBNAME;
var username = process.env.USERNAME;
var pass = process.env.PASSWORD;

// Configuration
app.configure( function() {
    app.use(lessMiddleware(path.resolve(publicDir)));
    app.use(express.static(path.resolve(publicDir)));
    app.use(express.bodyParser());

    app.set('view engine', 'html');
});

var database = new DataProvider(host, port, dbname, username, pass);

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.get('/list/:id', function (req, res) {
    res.sendfile(path.resolve(publicDir + '/list.html'));
});

app.post('/new', function(req, res){
    database.save({alphabet:req.body.alphabet, linkID: req.body.linkID}, function( error, docs) {
        res.redirect('/');
    });
});

app.get('/list/api/:id', function(req, res){
    database.findById( req.params.id, function(error, docs){
        res.send(docs);
    });
});

module.exports = app;