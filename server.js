var express = require('express');
var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;

var app = express();

//MONGO
/*
MongoClient.connect('mongodb://127.0.0.1:27017/references', function(err, db) {
    if (err) throw err;

    var collection = db.collection('jquery');
    collection.insert([{
    "border": "1"

}, {
    "height": "2"
}, {
    "width": "3"
}, {
    "x": "y"
}], function(err, docs) {

        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });

        // Locate all the entries using find 
        collection.find().toArray(function(err, results) {
            console.dir(results);
            // Let's close the db 
            db.close();
        });
    });
})*/


MongoClient.connect('mongodb://127.0.0.1:27017/references', function(err, db) {
    if (err) throw err;

    var collection = db.collection('jquery');

        // Locate all the entries using find 
        collection.find().toArray(function(err, results) {
            
            app.get('/api', function(req,res){
              res.send(results);
            })
            // Let's close the db 
            db.close();
        });

})



//APP

var server = app.listen(8000, function() {

    app.use(express.static(__dirname + '/bower_components'));
    app.use(express.static(__dirname + '/src'));

    console.log('App is listening at http://%s:%s', server.address().address, server.address().port)

})