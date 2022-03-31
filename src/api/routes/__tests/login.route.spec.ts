import bcrypt from 'bcrypt';
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

const mockUserInstance = {
    get: () => user.password,
    ...user
};

import CONSTANTS from '../../../constants';
const {
    LOGIN_SUCCESSFUL,
    CREDENTIALS_INCORRECT
} = CONSTANTS.CONTROLLER_RESPONSE;

jest.mock('../../../middlewares/auth/signToken.auth', () =>
    jest.fn(({}, res, {}) =>
        res.json({
            info: 'Successfully logged in',
            user
        })
    )
);

const mockFindOne: jest.Mock = jest.fn();
const mockFindAll: jest.Mock = jest.fn();
const mockCreate: jest.Mock = jest.fn();

jest.mock('../../../models', () => {
    return {
        User: {
            findOne: () => mockFindOne(),
            findAll: () => mockFindAll(),
            create: () => mockCreate()
        }
    };
});

describe("When the route '/login' is used with the correct parameters", () => {
    test("'post' method for '/login/' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() =>
            Promise.resolve(mockUserInstance)
        );
        jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => true);

        const res = await request(app).post('/').send(user);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            info: LOGIN_SUCCESSFUL,
            user
        });
    });
});

describe("When the route '/login' is used and the user doesn't exist", () => {
    test("'post' method for '/login/' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(null));
        const res = await request(app).post('/').send(user);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            info: CREDENTIALS_INCORRECT
        });
    });
});
