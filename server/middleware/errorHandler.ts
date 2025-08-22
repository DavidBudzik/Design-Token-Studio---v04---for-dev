import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Default error
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // OpenAI specific errors
  if (err.code === 'ENOTFOUND' || err.message.includes('OPENAI_API_KEY')) {
    statusCode = 503;
    message = 'AI service temporarily unavailable';
  }

  // Rate limiting errors
  if (err.message.includes('rate limit')) {
    statusCode = 429;
    message = 'Too many requests, please try again later';
  }

  // Validation errors
  if (err.message.includes('validation')) {
    statusCode = 400;
  }

  res.status(statusCode).json({
    error: {
      message,
      code: err.code || 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};