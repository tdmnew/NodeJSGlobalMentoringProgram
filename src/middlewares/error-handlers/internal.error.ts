import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const internalErrorHandler = (err: Error, {}, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
};

export default internalErrorHandler;
