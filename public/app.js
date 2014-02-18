
/**
 * Module dependencies.
 */

var express = require('express');
var routesIndex = require('./routes/index');
var routesRecipe = require('./routes/recipe');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/public')));
app.use(stylus.middleware({ src: __dirname + '/public',compile: compile }));
function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.set('compress', true)
		.use(nib());
}

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routesIndex.index);
app.get('/recipe', routesRecipe.index);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
