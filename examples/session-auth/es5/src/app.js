var express = require('express');
var session = require('express-session');

var routes = require('./routes');
var middleware = require('./middleware');

var checkAuth = middleware.checkAuth;

var app = express();

app.use(express.json());

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);

app.use(checkAuth);

app.get('/', function(req, res) {
  return res.json({ message: 'Welcome' });
});

app.use('/', routes);

module.exports = app;
