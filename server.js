var express = require('express');

var app = express();

var server = app.listen(8000, function(){

	app.use(express.static(__dirname + '/bower_components'));
	app.use(express.static(__dirname + '/src'));

	console.log('App is listening at http://%s:%s', server.address().address, server.address().port)

})