import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

import { User as UserModel } from '../models';
import User from '../types/user.type';

import { userAccess } from '../data-access';

interface UserServiceInterface {
    userModel: typeof UserModel;
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

    async createUser(
        userParams: Pick<User, 'login' | 'password' | 'age'>
    ): Promise<Model<User> | null> {
        const newUser = {
            login: userParams.login,
            password: userParams.password,
            age: userParams.age,
            isDeleted: false
        };

        const user = await this.userModel.create(newUser);

        return user;
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
