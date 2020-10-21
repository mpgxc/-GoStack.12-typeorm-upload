import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import routes from './routes';
import errorHandler from './errors/handler';
import createConnection from './database';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export { app };
