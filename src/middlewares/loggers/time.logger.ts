import { Response } from 'express';
import morgan, { StreamOptions } from 'morgan';

import logger from '../../config/winston.config';

const stream: StreamOptions = {
    write: (message) => logger.info(message)
};

const responseTime = morgan(':status :method :url - :response-time ms', {
    skip: ({}, res: Response) => res.statusCode !== 200,
    stream
});

export default responseTime;
