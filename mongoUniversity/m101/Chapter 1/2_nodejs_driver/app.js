var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

  assert.equal(null, err);
  console.log('Successfully connected to the server');

  // Find the documents in our collection
  db.collection('movies').find({}).toArray( function(err, docs) {

    // Print the title of each document
    docs.forEach(function(doc) {
      console.log(doc.title + ' (' + doc.year + ')');
    })

    // close the connection to the database
    db.close();
  });

  console.log('Called find()');
})
