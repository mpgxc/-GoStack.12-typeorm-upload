import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

import AppError from './AppError';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default errorHandler;
