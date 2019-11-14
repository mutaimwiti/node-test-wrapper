import express from 'express';
import routes from './routes';
import { checkAuth } from './middleware';

const app = express();

app.use(checkAuth);

app.get('/', (req, res) => res.json({ message: 'Welcome' }));

app.use('/', routes);

export default app;
