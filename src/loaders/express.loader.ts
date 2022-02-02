import { Application, json } from 'express';

import loggers from '../middlewares/loggers';
import routes from '../api/routes';

const expressLoader = ({ app }: { app: Application }) => {
    try {
        app.use(json());
        app.use(loggers.apiLogger);
        app.use(routes());
        console.log('Express Loaded');
    } catch (e) {
        console.error(e);
    }

    return app;
};

export default expressLoader;
