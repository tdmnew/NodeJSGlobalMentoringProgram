import { Request } from 'express';

import logger from './winston.config';
import { Handler } from '../types/logger.type';

export const tokens = [
    {
        name: 'request-body',
        cb: (req: Request, {}) => {
            const body = JSON.stringify(req.body);
            return body;
        }
    }
];

export const handlers: Record<string, Handler> = {
    apiError: {
        format: ':status :method :url - :response-time ms | :request-body',
        options: {
            stream: {
                write: (message) => logger.error(message)
            },
            skip: ({}, res) => res.statusCode === 200
        }
    },
    time: {
        format: ':status :method :url - :response-time ms',
        options: {
            stream: {
                write: (message) => logger.info(message)
            },
            skip: ({}, res) => res.statusCode !== 200
        }
    }
};
