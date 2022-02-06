import winston from 'winston';
import rootPath from 'app-root-path';

const LOGS_PATH = `${rootPath}/logs`;

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.File({ filename: `${LOGS_PATH}/error.log`, level: 'error' }),
        new winston.transports.File({ filename: `${LOGS_PATH}/combined.log` })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: `${LOGS_PATH}/exceptions.log`, level: 'error' }),
        new winston.transports.Console()
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: `${LOGS_PATH}/rejections.log`, level: 'error' }),
        new winston.transports.Console()
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export default logger;
