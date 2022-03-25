import express, { json, NextFunction } from 'express';
import request from 'supertest';

import users from '../users.route';

import CONSTANTS from '../../../constants';
const { REGISTER_SUCCESSFUL } = CONSTANTS.CONTROLLER_RESPONSE;

const app = express();
app.use(json());
app.use('/', users);

const user = {
    id: '1',
    login: 'Test User',
    password: 'Testpass1234',
    age: 23,
    isDeleted: false
};

const updatedUser = {
    id: '1',
    login: 'Test User Updated',
    password: 'Testpass1234',
    age: 23,
    isDeleted: false
};

const deletedUser = {
    id: '1',
    login: 'Test User',
    password: 'Testpass1234',
    age: 23,
    isDeleted: true
};

const createdUser = {
    login: 'Test User 2',
    password: 'Testpass1234',
    age: 23
};

const successfulUserCreation = {
    info: REGISTER_SUCCESSFUL,
    user: createdUser
};

jest.mock('../../../middlewares/auth/secureRoute.auth', () =>
    jest.fn((req, res, next) => next())
);

jest.mock('../../../services/user.service.ts', () => {
    return jest.fn().mockImplementation(() => {
        return {
            createUser: jest.fn().mockReturnValue(successfulUserCreation),
            getUsers: jest.fn().mockReturnValue([user]),
            getUser: jest.fn().mockReturnValue(user),
            updateUser: jest.fn().mockReturnValue(updatedUser),
            deleteUser: jest.fn().mockReturnValue(deletedUser)
        };
    });
});

describe("When the route '/users' is used with the correct parameters", () => {
    test("'get' method for '/users/' is called and returns the correct response", async () => {
        const res = await request(app).get('/');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([user]);
    });

    test("'get' method for '/users/:id' is called and returns the correct response", async () => {
        const res = await request(app).get('/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(user);
    });

    test("'put' method for '/users/:id' is called and returns the correct response", async () => {
        const res = await request(app)
            .put('/1')
            .send({ login: updatedUser.login });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(updatedUser);
    });

    test("'delete' method for '/users/:id' is called and returns the correct response", async () => {
        const res = await request(app).delete('/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(deletedUser);
    });

    test("'post' method for '/users/' is called and returns the correct response", async () => {
        const res = await request(app).post('/').send(createdUser);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(successfulUserCreation);
    });
});
