import { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User as UserModel } from '../models';
import User from '../types/user.type';

import { userAccess } from '../data-access';

import { ENV_VARIABLES } from '../config';
import CONSTANTS from '../constants';
const {
    REGISTER_SUCCESSFUL,
    REGISTER_UNSUCCESSFUL,
    REGISTER_USER_EXISTS,
    CREDENTIALS_INCORRECT,
    LOGIN_SUCCESSFUL
} = CONSTANTS.CONTROLLER_RESPONSE;

interface UserServiceInterface {
    userModel: typeof UserModel;
}

interface UserAccessToken {
    user?: Model<User>;
    token?: string;
    info?: string;
}

const { findUser, autoSuggestions } = userAccess;

const hashPassword = async (originalPass?: string): Promise<string | void> => {
    if (!originalPass) return;

    try {
        return await bcrypt.hash(originalPass, 10);
    } catch (err: unknown) {
        if (err instanceof Error) throw new Error(err.message);
    }
};

const comparePassword = async (
    plainPass: string,
    hashedPass?: string
): Promise<boolean | void> => {
    if (!hashedPass) return;

    try {
        return await bcrypt.compare(plainPass, hashedPass);
    } catch (err: unknown) {
        if (err instanceof Error) throw new Error(err.message);
    }
};

class UserService implements UserServiceInterface {
    userModel: UserServiceInterface['userModel'];

    constructor(userModel: UserServiceInterface['userModel']) {
        this.userModel = userModel;
    }

    async login(
        login: User['login'],
        password: User['password']
    ): Promise<UserAccessToken> {
        const user: Model<User> | null = await this.userModel.findOne(
            findUser({ login })
        );

        const isValidPass = await comparePassword(
            password,
            user?.getDataValue('password')
        );

        if (!user || !isValidPass) return { info: CREDENTIALS_INCORRECT };

        const token = jwt.sign(
            {
                data: user.get('id'),
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            },
            ENV_VARIABLES.JWT_SECRET ?? ''
        );

        return { user, token, info: LOGIN_SUCCESSFUL };
    }

    async createUser(
        userParams: Pick<User, 'login' | 'password' | 'age'>
    ): Promise<UserAccessToken> {
        const userExists = await this.userModel.findOne(
            findUser({ login: userParams.login })
        );

        if (userExists) {
            return { info: REGISTER_USER_EXISTS };
        }

        const hashedPass = await hashPassword(userParams.password);

        if (!hashedPass) {
            return {
                info: REGISTER_UNSUCCESSFUL
            };
        }

        const newUser = await this.userModel.create({
            login: userParams.login,
            password: hashedPass,
            age: userParams.age,
            isDeleted: false
        });

        const token = jwt.sign(
            {
                data: newUser.get('id'),
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            },
            ENV_VARIABLES.JWT_SECRET ?? ''
        );

        return { user: newUser, info: REGISTER_SUCCESSFUL, token };
    }

    async updateUser(
        userId: User['id'],
        userParams: Partial<User>
    ): Promise<Model<User> | null> {
        const user = await this.userModel.findOne(findUser({ id: userId }));

        if (!user) return null;

        await user.update({
            login: userParams.login,
            password: await hashPassword(userParams.password),
            age: userParams.age
        });

        return user;
    }

    async getUser({
        userId,
        userLogin
    }: {
        userId?: User['id'];
        userLogin?: User['login'];
    }): Promise<Model<User> | null> {
        const user: Model<User> | null = await this.userModel.findOne(
            findUser({ id: userId, login: userLogin })
        );

        return user;
    }

    async getUsers(
        loginSubstring: string,
        limit: number
    ): Promise<Model<User>[] | null> {
        const users: Model<User>[] = await this.userModel.findAll(
            autoSuggestions(loginSubstring, limit)
        );

        if (!users) return null;

        return users;
    }

    async deleteUser(userId: User['id']): Promise<Model<User> | null> {
        const user = await this.userModel.findOne(findUser({ id: userId }));

        if (!user) return null;

        await user.update({ isDeleted: true });
        return user;
    }
}

export default UserService;
