var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var DataProvider = function(host, port) {
    this.database= new Db('alphabets', new Server(host, port, {auto_reconnect: true, safe: false, w:1}, {}));
    this.database.open(function(err, client) {
        console.log('db connection open...');
    });

    this.getCollection= function(callback) {
        this.database.collection('alphabets', function(error, alphabet_collection) {
            if( error ) {
                callback(error);
            }
            else {
                callback(null, alphabet_collection);
            }
        });
    };

    this.findById = function(id, callback) {
        this.getCollection(function(error, alphabet_collection) {
            if( error ) {
                callback(error);
            }
            else {
                alphabet_collection.findOne({_id: alphabet_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, 
                    function(error, result) {
                        if( error ) callback(error)
                        else callback(null, result)
                    }
                );
            }
        });
    };

    this.save = function(alphabet, callback) {
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

    return this;
};
// new ArticleProvider().save([
//     {alphabet: [{title:'astronaut', description:''}, 
//         {title:'archeologist', description:''}, 
//         {title:'actor', description:''}], email: "thrawst88@gmail.com", title: "Tristan's awesome list"}
// ], function(error, articles){});

module.exports = DataProvider;