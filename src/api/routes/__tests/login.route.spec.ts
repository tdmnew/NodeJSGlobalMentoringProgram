import express, { json } from 'express';
import request from 'supertest';

import login from '../login.route';

const app = express();
app.use(json());
app.use('/', login);

const user = {
    login: 'Test User',
    password: 'Testpass1234'
};

jest.mock('../../../services/user.service.ts', () => {
    return jest.fn().mockImplementation(() => {
        return {
            login: jest.fn().mockReturnValue({
                info: 'Successfully logged in',
                user
            })
        };
    });
});

jest.mock('../../../middlewares/auth/signToken.auth', () =>
    jest.fn(({}, res, {}) =>
        res.json({
            info: 'Successfully logged info',
            user
        })
    )
);

describe("When the route '/login' is used with the correct parameters", () => {
    test("'post' method for '/login/' is called and returns the correct response", async () => {
        const res = await request(app).post('/').send(user);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            info: 'Successfully logged info',
            user
        });
    });
});
