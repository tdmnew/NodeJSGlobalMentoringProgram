import SequelizeMock from 'sequelize-mock';
import bcrypt from 'bcrypt';

import UserService from '../user.service';

import CONSTANTS from '../../constants';
const { REGISTER_SUCCESSFUL } = CONSTANTS.CONTROLLER_RESPONSE;

const MockDB = new SequelizeMock();

const HASHED_PASS = 'New Pass';

const user1 = {
    id: '1',
    login: 'User 1',
    password: 'Test123',
    age: 30,
    isDeleted: false
};

const user2 = {
    login: 'User 2',
    password: 'Test1234',
    age: 32
};

const updatedUserParams = {
    login: 'Updated User',
    password: 'New Pass',
    age: 31
};

const successfulUserCreation = {
    user: user2,
    info: REGISTER_SUCCESSFUL
};

const mockUserModel = MockDB.define('users', user1);

const bcryptMock = jest.spyOn(bcrypt, 'hash');
bcryptMock.mockImplementation(() => HASHED_PASS);

test("when 'getUser' is called with the correct parameters", async () => {
    const userService = new UserService(mockUserModel);
    const returnedUser = await userService.getUser({ userId: user1.id });

    expect(returnedUser).toMatchObject(user1);
});

test("when 'getUsers' is called with the correct parameters", async () => {
    const userService = new UserService(mockUserModel);
    const returnedUser = await userService.getUsers('', 1);

    expect(returnedUser).toMatchObject([user1]);
});

test("when 'deleteUser' is called with the correct parameters", async () => {
    const userService = new UserService(mockUserModel);
    const returnedUser = await userService.deleteUser(user1.id);

    expect(returnedUser).toMatchObject({ ...user1, isDeleted: true });
});

test("when 'updateUser' is called with the correct parameters", async () => {
    const userService = new UserService(mockUserModel);
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

test("when 'createUser' is called with the correct parameters", async () => {
    mockUserModel.$queryInterface.$useHandler((query, queryOptions) => {
        if (query === 'findOne') {
            if (queryOptions[0].where.login === user2.login) return null;
        }
    });

    const userService = new UserService(mockUserModel);
    const returnedUser = await userService.createUser(user2);

    expect(returnedUser).toMatchObject({
        ...successfulUserCreation,
        user: { ...user2, password: HASHED_PASS, isDeleted: false }
    });
});
