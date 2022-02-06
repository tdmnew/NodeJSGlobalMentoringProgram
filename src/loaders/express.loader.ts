import { Application, json } from 'express';

import loggers from '../middlewares/loggers';
import errorHandlers from '../middlewares/error-handlers';

import routes from '../api/routes';

const expressLoader = ({ app }: { app: Application }) => {
    try {
        app.use(json());
        app.use(loggers.time);
        app.use(loggers.api);
        app.use(loggers.error);
        app.use(routes());
        app.use(errorHandlers.joiError);
        app.use(errorHandlers.internalError);
        console.log('Express Loaded');
    } catch (e) {
        console.error(e);
    }

    return app;
};

export default expressLoader;
