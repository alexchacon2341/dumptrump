var url = require('url');

exports.actions = {
  'GET': function(request, response) {
    var requestUrl = url.parse(request.url)
    sendResponse(response, 'No Get Requests', 200);
  },
  'POST': function(request, response) {
    var requestUrl = request.url;
  }
};

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST',
  'access-control-allow-headers': 'content-type, accept',
  'Content-Type': 'application/json'
};

exports.sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end();
};

var collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(data);
  });
};
