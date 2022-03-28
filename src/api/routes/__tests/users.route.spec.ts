import express, { json } from 'express';
import request from 'supertest';

import users from '../users.route';

const app = express();
app.use(json());
app.use('/', users);

import CONSTANTS from '../../../constants';
const { REGISTER_UNSUCCESSFUL, REGISTER_USER_EXISTS } =
    CONSTANTS.CONTROLLER_RESPONSE;

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

jest.mock('../../../middlewares/auth/secureRoute.auth', () =>
    jest.fn(({}, {}, next) => next())
);

jest.mock('../../../middlewares/auth/signToken.auth', () =>
    jest.fn(({}, res, {}) =>
        res.json({
            info: 'Successfully registered',
            user: createdUser
        })
    )
);

jest.mock('../../../services/user.service.ts', () => {
    return jest.fn().mockImplementation(() => {
        return {
            createUser: jest
                .fn()
                .mockReturnValueOnce({
                    info: 'Successfully registered',
                    user: createdUser
                })
                .mockReturnValueOnce({
                    info: 'A user already exists with this login. Please try again with a different name'
                })
                .mockReturnValueOnce({
                    info: 'Registration could not be completed at this time. Please try again later.'
                }),
            getUsers: jest
                .fn()
                .mockReturnValueOnce([user])
                .mockReturnValueOnce(null),
            getUser: jest
                .fn()
                .mockReturnValueOnce(user)
                .mockReturnValueOnce(null),
            updateUser: jest
                .fn()
                .mockReturnValueOnce(updatedUser)
                .mockReturnValueOnce(null),
            deleteUser: jest
                .fn()
                .mockReturnValueOnce(deletedUser)
                .mockReturnValueOnce(null)
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
        expect(res.body).toEqual({
            info: 'Successfully registered',
            user: createdUser
        });
    });
});

describe("When the route '/users' is used with the incorrect parameters and/or a user already exists", () => {
    test("'get' method for '/users/' is called and returns the correct response", async () => {
        const res = await request(app).get('/');

        expect(res.statusCode).toBe(404);
    });

    test("'get' method for '/users/:id' is called and returns the correct response", async () => {
        const res = await request(app).get('/1');

        expect(res.statusCode).toBe(404);
    });

    test("'put' method for '/users/:id' is called and returns the correct response (User not found)", async () => {
        const res = await request(app)
            .put('/1')
            .send({ login: updatedUser.login });

        expect(res.statusCode).toBe(404);
    });

    test("'put' method for '/users/:id' is called and returns the correct response (Wrong params)", async () => {
        const res = await request(app).put('/1').send({ login: '' });

        expect(res.statusCode).toBe(500);
    });

    test("'delete' method for '/users/:id' is called and returns the correct response", async () => {
        const res = await request(app).delete('/1');

        expect(res.statusCode).toBe(404);
    });

    test("'post' method for '/users/' is called and returns the correct response (User exists)", async () => {
        const res = await request(app).post('/').send(createdUser);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            info: REGISTER_USER_EXISTS
        });
    });

    test("'post' method for '/users/' is called and returns the correct response (Internal service error)", async () => {
        const res = await request(app).post('/').send(createdUser);

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({
            info: REGISTER_UNSUCCESSFUL
        });
    });
});
