import { Request, Response } from 'express';
import morgan, { StreamOptions } from 'morgan';

import logger from '../../config/winston.config';

const stream: StreamOptions = {
    write: (message) => logger.error(message)
};

morgan.token('response-body', ({}, res: Response) => {
    return res.locals.body;
});

morgan.token('request-body', (req: Request, {}) => {
    const reqBody = JSON.stringify(req.body);
    return reqBody;
});

const errorLogger = morgan(
    ':status :method :url - :response-time ms | :response-body | :request-body',
    {
        stream,
        skip: ({}, res: Response) => res.statusCode === 200
    }
);

export default errorLogger;
