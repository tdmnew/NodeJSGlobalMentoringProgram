import { Router } from 'express';

import userRoute from './users.route';
import groupRoute from './groups.route';

import auth from '../../middlewares/auth';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const routes = () => {
    const app = Router();

    if (process.env.NODE_ENV === 'development') {
        app.get('/error-test', ({}, {}, next) => {
            return next(
                new Error(
                    'This is an error and it should be logged to the console'
                )
            );
        });
    }

    const paths = [
        {
            path: '/users',
            route: userRoute
        },
        {
            path: '/groups',
            route: groupRoute
        }
    ];

    paths.forEach((route) => {
        app.use(route.path, route.route);
    });

    app.use('/login', auth.login);

    return app;
};

export default routes;
