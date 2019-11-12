const express = require('express');
const routes = require('./router');

const app = express();

app.get('/', function(req, res) {
  return res.json({ message: 'Welcome' });
});

app.use('/', routes);

module.exports = app;
