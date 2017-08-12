var Path = require('path');
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();
var requestHandler = require('./request-handler.js');

app.post('/', function(request, response) {
  var method = request.method;
  console.log('post request made: ', method);
  var action = requestHandler.actions[method];
  action(request, response);
})
app.use('/', express.static('public'));
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
  console.log('Listening on ', app.get('port'));
});
