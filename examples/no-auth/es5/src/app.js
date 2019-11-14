const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.get('/', function(req, res) {
  return res.json({ message: 'Welcome' });
});

app.use('/', routes);

module.exports = app;
