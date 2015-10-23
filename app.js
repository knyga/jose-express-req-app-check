var express = require('express');
var app = express();

var getRoutesStack = function(app) {
	var stack = [];
	app._router.stack.forEach(function(r) {
		if (r.route && r.route.path) {
			stack.push(r.route.path);
		}
	});
	return stack;
};

app.use(function(req, res, next) {
	console.log('Time:', Date.now());
	console.log('middleware stack', getRoutesStack(req.app));
	next();
});

app.get('/test', function(req, res, next) {
	console.log('request stack', getRoutesStack(req.app));
	next();
});


var server = app.listen(3333, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Test app listening at http://%s:%s', host, port);
});