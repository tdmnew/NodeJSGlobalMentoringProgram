import SequelizeMock from 'sequelize-mock';
import bcrypt from 'bcrypt';

import UserService from '../user.service';
import User from '../../types/user.type';

import CONSTANTS from '../../constants';
const {
    REGISTER_UNSUCCESSFUL,
    REGISTER_SUCCESSFUL,
    LOGIN_SUCCESSFUL,
    CREDENTIALS_INCORRECT
} = CONSTANTS.CONTROLLER_RESPONSE;

const HASHED_PASS = 'New Pass';

const user1: User = {
    id: '1',
    login: 'User 1',
    password: 'Test123',
    age: 30,
    isDeleted: false
};

const user2: Pick<User, 'login' | 'password' | 'age'> = {
    login: 'User 2',
    password: 'Test1234',
    age: 32
};

const updatedUserParams: Partial<User> = {
    login: 'Updated User',
    password: 'New Pass',
    age: 31
};

const successfulLogin = {
    user: user1,
    info: LOGIN_SUCCESSFUL
};

const successfulUserCreation = {
    user: user1,
    info: REGISTER_SUCCESSFUL
};

const MockDB = new SequelizeMock();
const mockUserModel = MockDB.define('users', user1);

describe('When each method is called with the appropriate parameters', () => {
    beforeEach(() => {
        const bcryptCompare = jest.spyOn(bcrypt, 'compare');
        bcryptCompare.mockImplementation(() => true);

        const bcryptHash = jest.spyOn(bcrypt, 'hash');
        bcryptHash.mockImplementation(() => HASHED_PASS);

        mockUserModel.$queryInterface.$useHandler((query, queryOptions) => {
            if (query === 'findOne') {
                if (queryOptions[0].where.login === user2.login) return null;
            }
        });
    });

    const userService = new UserService(mockUserModel);

    test("'getUser' returns the appropriate response", async () => {
        const returnedUser = await userService.getUser({ userId: user1.id });

        expect(returnedUser).toMatchObject(user1);
    });

    test("'getUsers' returns the appropriate response", async () => {
        const returnedUser = await userService.getUsers('', 1);

        expect(returnedUser).toMatchObject([user1]);
    });

    test("'deleteUser' returns the appropriate response", async () => {
        const returnedUser = await userService.deleteUser(user1.id);

        expect(returnedUser).toMatchObject({ ...user1, isDeleted: true });
    });

    test("'updateUser' returns the appropriate response", async () => {
        const returnedUser = await userService.updateUser(
            user1.id,
            updatedUserParams
        );

        expect(returnedUser).toMatchObject({
            ...user1,
            ...updatedUserParams,
            password: HASHED_PASS
        });
    });

    test("'createUser' returns the appropriate response", async () => {
        const returnedUser = await userService.createUser(user2);

        expect(returnedUser).toMatchObject({
            ...successfulUserCreation,
            user: { ...user2, password: HASHED_PASS, isDeleted: false }
        });
    });

    test("'login' returns the appropriate response", async () => {
        const returnedUser = await userService.login(
            user1.login,
            user1.password
        );

        expect(returnedUser).toMatchObject(successfulLogin);
    });
});

const unsucccessfulLogin = { info: CREDENTIALS_INCORRECT };

const unsucccessfulUserCreation = {
    info: REGISTER_UNSUCCESSFUL
};

describe('When each method is called with the incorrect parameters and/or there are no users', () => {
    beforeEach(() => {
        mockUserModel.$queryInterface.$useHandler((query, queryOptions) => {
            if (query === 'findOne') return null;
            if (query === 'findAll') return null;
        });
    });

    const userService = new UserService(mockUserModel);

    test("'getUser' returns the appropriate response", async () => {
        const returnedUser = await userService.getUser({ userId: 'n/a' });

        expect(returnedUser).toBeNull();
    });

    test("'getUsers' returns the appropriate response", async () => {
        const returnedUser = await userService.getUsers('', 1);

        expect(returnedUser).toBeNull();
    });

    test("'deleteUser' returns the appropriate response", async () => {
        const returnedUser = await userService.deleteUser(user1.id);

        expect(returnedUser).toBeNull();
    });

    test("'updateUser' returns the appropriate response", async () => {
        const returnedUser = await userService.updateUser(
            user1.id,
            updatedUserParams
        );

        expect(returnedUser).toBeNull();
    });

    test("when this is an error hashing the password, 'createUser' returns the appropriate response", async () => {
        const bcryptHash = jest.spyOn(bcrypt, 'hash');
        bcryptHash.mockImplementation(() => false);

        const returnedUser = await userService.createUser(user2);

        expect(returnedUser).toMatchObject(unsucccessfulUserCreation);
    });

    test("'login' returns the appropriate response", async () => {
        const returnedUser = await userService.login('n/a', 'n/a');

        expect(returnedUser).toMatchObject(unsucccessfulLogin);
    });
});
