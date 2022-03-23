import express, { json } from 'express';
import request from 'supertest';

import login from '../login.route';

import CONSTANTS from '../../../constants';
const { LOGIN_SUCCESSFUL } = CONSTANTS.CONTROLLER_RESPONSE;

const app = express();
app.use(json());
app.use('/', login);

const user = {
    login: 'Test User',
    password: 'Testpass1234'
};

const successfulLogin = {
    info: LOGIN_SUCCESSFUL,
    user,
    token: ''
};

jest.mock('../../../services/user.service.ts', () => {
    return jest.fn().mockImplementation(() => {
        return {
            login: jest.fn().mockReturnValue(successfulLogin)
        };
    });
});

describe("When the route '/login' is used with the correct parameters", () => {
    test("'post' method for '/login/' is called and returns the correct response", async () => {
        const res = await request(app).post('/').send(user);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(successfulLogin);
    });
});
