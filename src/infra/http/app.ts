import 'reflect-metadata';
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import routes from './routes';
import errorHandler from '../../shared/errors/handler';
import createConnection from '../database';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);
app.use(errorHandler);

export { app };
