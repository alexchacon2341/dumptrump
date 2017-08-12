var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST',
  'access-control-allow-headers': 'content-type, accept',
  'Content-Type': 'application/json'
};

exports.sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(data);
  });
};

exports.makeActionHandler = function(actionMap) {
  return function(request, response) {
    var method = request.method;
    console.log('method', method);
    if (method === 'Post'){
      var action = actionMap[method];
      action(request, response);
    } else {
      exports.sendResponse(response, '', 404);
    }
  };
};
