import { getMockReq, getMockRes } from '@jest-mock/express';
import {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
} from '../users.controller';

const user = {
    id: '1',
    login: 'Test User',
    password: 'Testpass1234',
    age: 23,
    isDeleted: false
};

const createdUser = {
    id: '2',
    login: 'New Test User',
    password: 'Testpass1234',
    age: 23,
    isDeleted: false
};

const updatedUser = {
    id: '1',
    login: 'Test User 2',
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

const successfulUserCreation = {
    info: 'Creation Successful',
    token: '',
    user: createdUser
};

jest.mock('../../../services/user.service.ts', () => {
    return jest.fn().mockImplementation(() => {
        return {
            createUser: jest.fn().mockReturnValue(successfulUserCreation),
            getUser: jest.fn().mockReturnValue(user),
            getUsers: jest.fn().mockReturnValue([user]),
            updateUser: jest.fn().mockReturnValue(updatedUser),
            deleteUser: jest.fn().mockReturnValue(deletedUser)
        };
    });
});

jest.mock('../../../middlewares/auth/signToken.auth.ts', () => {
    return jest.fn().mockReturnValue(successfulUserCreation);
});

describe("When the method 'getUser' is called", () => {
    it('should 200 and return correct value', async () => {
        const req = getMockReq({ params: { id: '1' } });

        const { res } = getMockRes({
            locals: user
        });

        await getUser(req, res);

        expect(res.json).toHaveBeenCalledWith(user);
    });
});

describe("When the method 'getUsers' is called", () => {
    it('should 200 and return correct value', async () => {
        const req = getMockReq();

        const { res } = getMockRes({
            locals: [user]
        });

        await getUsers(req, res);

        expect(res.json).toHaveBeenCalledWith([user]);
    });
});

describe("When the method 'updateUser' is called", () => {
    it('should 200 and return correct value', async () => {
        const req = getMockReq({
            params: { id: '1' },
            body: { login: 'Test User 2' }
        });

        const { res } = getMockRes({
            locals: updatedUser
        });

        await updateUser(req, res);

        expect(res.send).toHaveBeenCalledWith(updatedUser);
    });
});

describe("When the method 'createUser' is called", () => {
    it('should 200 and return correct value', async () => {
        const req = getMockReq({
            body: createdUser
        });

        const { res } = getMockRes({
            locals: successfulUserCreation
        });

        const next = jest
            .fn()
            .mockReturnValue(res.json(successfulUserCreation));

        await createUser(req, res, next);

        expect(res.json).toHaveBeenCalledWith(successfulUserCreation);
    });
});

describe("When the method 'deleteUser' is called", () => {
    it('should 200 and return correct value', async () => {
        const req = getMockReq({ params: { id: '1' } });

        const { res } = getMockRes({
            locals: deletedUser
        });

        await deleteUser(req, res);

        expect(res.send).toHaveBeenCalledWith(deletedUser);
    });
});
