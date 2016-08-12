var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var engines = require('consolidate');
var assert = require('assert');
var bodyParser = require('body-parser');

// Initialize express
var app = express();
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended:true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Set up template engines
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views')

//Setup handler for internal server errors
function errorHandler(error, request, response, next) {
  console.error(error.message);
  console.error(error.stack);
  response.status(500).render('error_template', { error: error });
}

mongoClient.connect('mongodb://localhost:27017/video', function(error, db) {

  assert.equal(null, error);
  console.log('Successfully connected to MongoDB');

  // Routes
  //TODO : Redirect from all other routes to get /movies

  // Route to get list of movies
  app.get('/movies', function(request, response, next) {

    // get the movies from the db
    db.collection('movies').find({}).toArray(function(error, docs) {
      assert.equal(null, error);
      response.render('movie_list', {movies: docs, message: ''});
    })
  });

  // Route to post a new movie
  app.post('/movies', function(request, response, next) {
    console.log('Received request to post new movie into the db');

    var name = request.body.name;
    var year = request.body.year;
    var imdb = request.body.imdb;
    if(!name) {
      console.log(name);
      response.render('error_template', {error:'Name is mandatory'});
    }
    else {
      var movies = [{name: name, year: year, imdb: imdb}]
      db.collection('movies').insertMany(movies, function(error, result) {
        assert.equal(error, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        console.log("Inserted 1 movie");
      });

      // Get the latest list of movies and display them
      db.collection('movies').find({}).toArray(function(error, docs) {
        assert.equal(error, null);
        response.render('movie_list', {movies: docs, message:'Successfully submitted the movie'});
      })
    }
  })

});

app.use(errorHandler);

// Listen to the server at port 8000
var server = app.listen(8000, function() {
  var port = server.address().port;
  console.log('Server listening on port ' + port);
})
