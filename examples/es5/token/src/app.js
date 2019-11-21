var express = require('express');

var routes = require('./routes');
var middleware = require('./middleware');

var checkAuth = middleware.checkAuth;

var app = express();

app.use(express.json());

app.use(checkAuth);

app.get('/', function(req, res) {
  return res.json({ message: 'Welcome' });
});

app.use('/', routes);

module.exports = app;
