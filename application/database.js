var DB = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var DataProvider = function(host, port) {
    this.database= new DB('alphabet', new Server(host, port, {auto_reconnect: true}, {}));
    this.database.open(function(){});
};

DataProvider.prototype.save = function(alphabet, callback) {
    this.getCollection(function(error, alphabet_collection) {
        if( error ) {
            callback(error);
        }
        else {
            alphabet_collection.insert(alphabet, function() {
                callback(null, alphabet);
            });
        }
    });
};

DataProvider.prototype.getById = function(id, callback) {
    this.getCollection(function(error, alphabet_collection) {
        if( error ) {
            callback(error);
        }
        else {
            alphabet_collection.findOne({_id: alphabet_collection.db.bson_serializer.ObjectID(id)}, 
                function(error, result) {
                    if( error ) {
                        callback(error);
                    }
                    else {
                        callback(null, result);
                    }
                }
            );
        }
    });
};

exports.database = DataProvider;