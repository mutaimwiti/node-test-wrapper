const express = require('express');
const routes = require('./routes');
const middleware = require('./middleware');

const checkAuth = middleware.checkAuth;

const app = express();

app.use(express.json());

app.use(checkAuth);

app.get('/', function(req, res) {
  return res.json({ message: 'Welcome' });
});

app.use('/', routes);

module.exports = app;
