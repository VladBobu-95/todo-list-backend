
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const status = err.statusCode || 500;
    if (status >= 500) {
        logger.error({ err, method: req.method, url: req.url }, 'Unhandled server error');
    } else {
        logger.warn({ err: { message: err.message, name: err.name }, method: req.method, url: req.url }, 'Client error');
    }
    res.status(status).json({ error: err.message || 'Internal Server Error' });
};
