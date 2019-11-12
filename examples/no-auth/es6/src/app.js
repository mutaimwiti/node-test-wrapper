import express from 'express';
import routes from './routes';

const app = express();

app.get('/', (req, res) => res.json({ message: 'Welcome' }));

app.use('/', routes);

module.exports = app;
