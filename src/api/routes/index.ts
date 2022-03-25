import { Router } from 'express';

import userRoute from './users.route';
import groupRoute from './groups.route';
import loginRoute from './login.route';

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
        },
        {
            path: '/login',
            route: loginRoute
        }
    ];

    paths.forEach((route) => {
        app.use(route.path, route.route);
    });

    return app;
};

export default routes;
