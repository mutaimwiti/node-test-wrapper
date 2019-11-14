import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Welcome' }));

app.use('/', routes);

export default app;
