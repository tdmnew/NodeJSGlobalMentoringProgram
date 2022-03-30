import bcrypt from 'bcrypt';
import express, { json } from 'express';
import request from 'supertest';

import users from '../users.route';

const app = express();
app.use(json());
app.use('/', users);

import CONSTANTS from '../../../constants';
const {
    REGISTER_UNSUCCESSFUL,
    REGISTER_USER_EXISTS
} = CONSTANTS.CONTROLLER_RESPONSE;

const user1 = {
    id: '1',
    login: 'User 1',
    password: 'Test123',
    age: 30,
    isDeleted: false
};

const user2 = {
    id: '2',
    login: 'User 2',
    password: 'Test123',
    age: 23,
    isDeleted: false
};

const user1Updated = {
    id: '1',
    login: 'Test User Updated',
    password: 'Test123',
    age: 30,
    isDeleted: false
};

const user1Deleted = {
    id: '1',
    login: 'User 1',
    password: 'Test123',
    age: 30,
    isDeleted: true
};

const mockUserInstanceUpdate = {
    update: jest.fn(),
    ...user1Updated
};

const mockUserInstanceDelete = {
    update: jest.fn(),
    ...user1Deleted
};

jest.mock('../../../middlewares/auth/secureRoute.auth', () =>
    jest.fn(({}, {}, next) => next())
);

jest.mock('../../../middlewares/auth/signToken.auth', () =>
    jest.fn(({}, res, {}) =>
        res.json({
            info: 'Successfully registered',
            user: user2
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

describe("When the route '/users' is used with the correct parameters", () => {
    test("'get' method for '/users/' is called and returns the correct response", async () => {
        mockFindAll.mockImplementationOnce(() => Promise.resolve([user1]));

        const res = await request(app).get('/');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([user1]);
    });

    test("'get' method for '/users/:id' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(user1));

        const res = await request(app).get('/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(user1);
    });

    test("'put' method for '/users/:id' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() =>
            Promise.resolve(mockUserInstanceUpdate)
        );

        const res = await request(app)
            .put('/1')
            .send({ login: user1Updated.login });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(user1Updated);
    });

    test("'delete' method for '/users/:id' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() =>
            Promise.resolve(mockUserInstanceDelete)
        );

        const res = await request(app).delete('/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(user1Deleted);
    });

    test("'post' method for '/users/' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(null));
        mockCreate.mockImplementationOnce(() => Promise.resolve(user2));

        const res = await request(app).post('/').send({
            login: user2.login,
            password: user2.password,
            age: user2.age
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            info: 'Successfully registered',
            user: user2
        });
    });
});

describe("When the route '/users' is used with the incorrect parameters and/or a user already exists", () => {
    test("'get' method for '/users/' is called and returns the correct response", async () => {
        mockFindAll.mockImplementationOnce(() => Promise.resolve(null));

        const res = await request(app).get('/');

        expect(res.statusCode).toBe(404);
    });

    test("'get' method for '/users/:id' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(null));

        const res = await request(app).get('/1');

        expect(res.statusCode).toBe(404);
    });

    test("'put' method for '/users/:id' is called and returns the correct response (User not found)", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(null));

        const res = await request(app)
            .put('/1')
            .send({ login: user1Updated.login });

        expect(res.statusCode).toBe(404);
    });

    test("'put' method for '/users/:id' is called and returns the correct response (Wrong params)", async () => {
        const res = await request(app).put('/1').send({ login: '' });

        expect(res.statusCode).toBe(500);
    });

    test("'delete' method for '/users/:id' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(null));

        const res = await request(app).delete('/1');

        expect(res.statusCode).toBe(404);
    });

    test("'post' method for '/users/' is called and returns the correct response (User exists)", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(user2));

        const res = await request(app).post('/').send({
            login: user2.login,
            password: user2.password,
            age: user2.age
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            info: REGISTER_USER_EXISTS
        });
    });

    test("'post' method for '/users/' is called and returns the correct response (Internal service error)", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(null));

        const bcryptHash = jest.spyOn(bcrypt, 'hash');
        bcryptHash.mockImplementation(() => false);

        const res = await request(app).post('/').send({
            login: user2.login,
            password: user2.password,
            age: user2.age
        });

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({
            info: REGISTER_UNSUCCESSFUL
        });
    });
});
