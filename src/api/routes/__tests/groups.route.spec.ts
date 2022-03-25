import express, { json } from 'express';
import request from 'supertest';

import groups from '../groups.route';

const app = express();
app.use(json());
app.use('/', groups);

const group = {
    id: '1',
    name: 'Admin',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD FILES']
};

const createdGroup = {
    name: 'User',
    permissions: ['READ', 'WRITE']
};

const updatedGroup = {
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

jest.mock('../../../middlewares/auth/secureRoute.auth.ts', () =>
    jest.fn((req, res, next) => next())
);

jest.mock('../../../services/group.service.ts', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getGroup: jest.fn().mockReturnValue(group),
            getGroups: jest.fn().mockReturnValue([group]),
            addUsersToGroup: jest.fn().mockReturnValue({ success: true }),
            updateGroup: jest.fn().mockReturnValue(updatedGroup),
            createGroup: jest.fn().mockReturnValue(createdGroup),
            deleteGroup: jest.fn().mockReturnValue(group)
        };
    });
});

describe("When the route '/groups' is used with the correct parameters", () => {
    test("'get' method for '/groups/' is called and returns the correct response", async () => {
        const res = await request(app).get('/');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([group]);
    });

    test("'get' method for '/groups/:id' is called and returns the correct response", async () => {
        const res = await request(app).get('/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(group);
    });

    test("'put' method for '/groups/:id' is called and returns the correct response", async () => {
        const res = await request(app).put('/1').send({
            name: updatedGroup.name
        });

        expect(res.body).toEqual(updatedGroup);
    });

    test("'delete' method for '/groups/:id' is called and returns the correct response", async () => {
        const res = await request(app).delete('/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(group);
    });

    test("'post' method for '/groups/' is called and returns the correct response", async () => {
        const res = await request(app).post('/').send(createdGroup);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(createdGroup);
    });

    test("'post' method for '/groups/:id/users/add-users-to-group' is called and returns the correct response", async () => {
        const res = await request(app)
            .post(`/${group.id}/users/add-users-to-group`)
            .send({ userIds: [userToAdd.id] });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ success: true });
    });
});
