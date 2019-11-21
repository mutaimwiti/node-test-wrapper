var express = require('express');
var routes = require('./routes');

var app = express();

app.use(express.json());

app.get('/', function(req, res) {
  return res.json({ message: 'Welcome' });
});

app.use('/', routes);

module.exports = app;
