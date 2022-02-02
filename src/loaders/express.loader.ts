import { Application, json } from 'express';

import routes from '../api/routes';

const expressLoader = ({ app }: { app: Application }) => {
    try {
        app.use(json());
        app.use(routes());
        console.log('Express Loaded');
    } catch (e) {
        console.error(e);
    }

    return app;
};

export default expressLoader;
