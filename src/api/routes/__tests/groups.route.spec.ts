import express, { json } from 'express';
import request from 'supertest';

import groups from '../groups.route';

const app = express();
app.use(json());
app.use('/', groups);

const group1 = {
    id: '1',
    name: 'Admin',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD FILES']
};

const group2 = {
    id: '2',
    name: 'User',
    permissions: ['READ', 'WRITE']
};

const group1Updated = {
    id: '1',
    name: 'Updated Group',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD FILES']
};

const userToAdd = {
    id: '1',
    login: 'Test User',
    password: 'Testpass1234',
    age: 23,
    isDeleted: false
};

const mockGroupInstanceUpdate = {
    update: jest.fn(),
    ...group1Updated
};

const mockGroupInstanceDelete = {
    destroy: jest.fn(),
    ...group1
};

jest.mock('../../../middlewares/auth/secureRoute.auth.ts', () =>
    jest.fn((req, res, next) => next())
);

const mockFindOne: jest.Mock = jest.fn();
const mockFindAll: jest.Mock = jest.fn();
const mockCreate: jest.Mock = jest.fn();

jest.mock('../../../models', () => {
    return {
        Group: {
            findOne: () => mockFindOne(),
            findAll: () => mockFindAll(),
            create: () => mockCreate()
        },
        sequelize: {
            transaction: jest.fn()
        }
    };
});

describe("When the route '/groups' is used with the correct parameters", () => {
    test("'get' method for '/groups/' is called and returns the correct response", async () => {
        mockFindAll.mockImplementationOnce(() => Promise.resolve([group1]));

        const res = await request(app).get('/');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([group1]);
    });

    test("'get' method for '/groups/:id' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(group1));

        const res = await request(app).get('/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(group1);
    });

    test("'put' method for '/groups/:id' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() =>
            Promise.resolve(mockGroupInstanceUpdate)
        );

        const res = await request(app).put('/1').send({
            name: group1Updated.name
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(group1Updated);
    });

    test("'delete' method for '/groups/:id' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() =>
            Promise.resolve(mockGroupInstanceDelete)
        );

        const res = await request(app).delete('/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(group1);
    });

    test("'post' method for '/groups/' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(null));

        mockCreate.mockImplementationOnce(() => Promise.resolve(group2));

        const res = await request(app)
            .post('/')
            .send({ name: group2.name, permissions: group2.permissions });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(group2);
    });

    test("'post' method for '/groups/:id/users/add-users-to-group' is called and returns the correct response", async () => {
        const res = await request(app)
            .post(`/${group1.id}/users/add-users-to-group`)
            .send({ userIds: [userToAdd.id] });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ success: true });
    });
});

describe("When the route '/groups' is used with the incorrect parameters and/or a group is not found", () => {
    test("'get' method for '/groups/' is called and returns the correct response", async () => {
        mockFindAll.mockImplementationOnce(() => Promise.resolve(null));

        const res = await request(app).get('/');

        expect(res.statusCode).toBe(404);
    });

    test("'get' method for '/groups/:id' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(null));

        const res = await request(app).get('/1');

        expect(res.statusCode).toBe(404);
    });

    test("'put' method for '/groups/:id' is called and returns the correct response (Group not found)", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(null));

        const res = await request(app).put('/1').send({
            name: group1Updated.name
        });

        expect(res.statusCode).toBe(404);
    });

    test("'put' method for '/groups/:id' is called and returns the correct response (Wrong params)", async () => {
        const res = await request(app).put('/1').send({ name: '' });

        expect(res.statusCode).toBe(500);
    });

    test("'delete' method for '/groups/:id' is called and returns the correct response", async () => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve(null));

        const res = await request(app).delete('/1');

        expect(res.statusCode).toBe(404);
    });

    test("'post' method for '/groups/' is called and returns the correct response", async () => {
        const res = await request(app).post('/').send();

        expect(res.statusCode).toBe(500);
    });

    test("'post' method for '/groups/:id/users/add-users-to-group' is called and returns the correct response", async () => {
        const res = await request(app)
            .post(`/${group1.id}/users/add-users-to-group`)
            .send({ userIds: [] });

        expect(res.statusCode).toBe(500);
    });
});
