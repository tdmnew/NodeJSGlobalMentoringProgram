import { Handler as StreamHandler } from 'express';

import { Handler, HttpLoggerServiceInterface } from '../types/logger.type';

class HttpLoggerService implements HttpLoggerServiceInterface {
    logger: HttpLoggerServiceInterface['logger'];

    constructor(
        logger: HttpLoggerServiceInterface['logger'],
    ) {
        this.logger = logger;
    }

    apiError(format: Handler['format'], options: Handler['options']): StreamHandler {
        return this.logger(format, options);
    }

    time(format: Handler['format'], options: Handler['options']): StreamHandler {
        return this.logger(format, options);
    }
}

export default HttpLoggerService;
