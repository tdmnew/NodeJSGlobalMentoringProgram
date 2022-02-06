import { Response, NextFunction } from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import { StatusCodes } from 'http-status-codes';

const joiErrorHandler = (
    err: ExpressJoiError,
    {},
    res: Response,
    next: NextFunction
) => {
    if (err?.error?.isJoi) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: err.error.toString() });
    }

    next(err);
};

export default joiErrorHandler;
