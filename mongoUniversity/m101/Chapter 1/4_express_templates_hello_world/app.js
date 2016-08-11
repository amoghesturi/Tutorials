var express = require('express');
var app = express();
var engines = require('consolidate'); // Wrapper for a number of wrappers
// for template engines for express

// Application settings to use consolidate in express
app.engine('html', engines.nunjucks);  // Registering the nungucks associated with html
app.set('view engine', 'html'); 
app.set('views', __dirname + '/views'); // sets where the templates are located

app.get('/', function(request, response) {
  // render(templeateFileName, {Object that needs to be inserted in the template})
  response.render('hello', {'name': 'Templates'});
});

app.use(function(request, response) {
  response.sendStatus(404);
});

var server = app.listen(8000, function() {
  var port = server.address().port;
  console.log('Express server listening on port ' + port);
})
