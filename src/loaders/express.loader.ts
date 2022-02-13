import morgan, { token } from 'morgan';
import { Application, json } from 'express';

import HttpLogger from '../services/httpLogger.service';
import routeLogger from '../middlewares/loggers/api.logger';
import errorHandler from '../middlewares/error-handlers';

import routes from '../api/routes';

import { tokens, handlers } from '../config/morgan.config';

const expressLoader = ({ app }: { app: Application }) => {
    try {
        const httpLogger = new HttpLogger(morgan);
        const { apiError, time } = handlers;

        tokens.forEach((t) => {
            token(t.name, t.cb);
        });

        app.use(json());
        app.use(httpLogger.apiError(apiError.format, apiError.options));
        app.use(httpLogger.time(time.format, time.options));
        app.use(routeLogger);
        app.use(routes());
        app.use(errorHandler.joiError);
        app.use(errorHandler.internalError);
        console.log('Express Loaded');
    } catch (e) {
        console.error(e);
    }

    return app;
};

export default expressLoader;
