var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

DataProvider = function(host, port, dbname, username, password) {
    this.database = new Db(dbname, new Server(host, port, {w:1}), {});
    this.database.open(function(err,db){
     if(db){
        db.authenticate(username, password,function(err2,data2){
             if(data2){
                 console.log("Database opened");
             }
             else{
                 console.log(err2);
             }
         });
      }
      else{
           console.log(err);
      }
   });
};

DataProvider.prototype.getCollection= function(callback) {
    this.database.collection('alphabets', function(error, alphabet_collection) {
        if( error ) {
            callback(error);
        }
        else {
            callback(null, alphabet_collection);
        }
    });
};

DataProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, alphabet_collection) {
        if( error ) {
            callback(error);
        }
        else {
            alphabet_collection.findOne({linkID: id}, 
                function(error, result) {
                    if( error ) callback(error)
                    else callback(null, result)
                }
            );
        }
    });
};

DataProvider.prototype.save = function(alphabet, callback) {
    this.getCollection(function(error, alphabet_collection) {
        if( error ) {
            callback(error);
        }
        else {
            alphabet_collection.insert(alphabet, {w:1}, function(err, result) {
                if (err){
                    throw err;
                }
                //console.log(result);
                callback(null, alphabet);
            });
        }
    });
};

exports.DataProvider = DataProvider;