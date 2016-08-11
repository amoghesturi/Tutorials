var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.send('Hello world');
});

app.use(function(request, response) {
  response.sendStatus(404);
});

var server = app.listen(8000, function() {
  var port = server.address().port;
  console.log('Express server listening on port ' + port);
})
