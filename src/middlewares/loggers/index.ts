import winston from 'winston';

import apiLogger from './api.logger';

const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    winstonLogger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

const loggers = {
    apiLogger
};

export default loggers;
