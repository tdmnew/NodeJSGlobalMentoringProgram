import { Model } from 'sequelize';

import { User as UserModel } from '../models';
import User from '../types/user.type';

import { userAccess } from '../data-access';

interface UserServiceInterface {
  userModel: typeof UserModel;
}

const { userLogin, findUser, autoSuggestions } = userAccess;

class UserService implements UserServiceInterface {
    userModel: UserServiceInterface['userModel'];

    constructor(userModel: UserServiceInterface['userModel']) {
        this.userModel = userModel;
    }

    async login(login: User['login'], password: User['password']): Promise<Model<User> | null> {
        const user: Model<User> | null = await this.userModel.findOne(
            userLogin(login, password)
        );

        if (!user) return null;

        return user;
    }

    async createUser(userParams: Partial<User>): Promise<Model<User> | null>  {
        userParams.isDeleted = false;

        const user = await this.userModel.create(userParams);

        return user;
    }

    async updateUser(userId: User['id'], userParams: Partial<User>): Promise<Model<User> | null> {
        const user = await this.userModel.findOne(findUser(userId));

        if (!user) return null;

        await user.update({
            login: userParams.login,
            password: userParams.password,
            age: userParams.age
        });

        return user;
    }

    async getUser(userId: User['id']): Promise<Model<User> | null> {
        const user: Model<User> | null = await this.userModel.findOne(
            findUser(userId)
        );

        return user;
    }

    async getUsers(loginSubstring: string, limit: number): Promise<Model<User>[] | null> {
        const users: Model<User>[] = await this.userModel.findAll(
            autoSuggestions(loginSubstring, limit)
        );

        if (!users) return null;

        return users;
    }

    async deleteUser(userId: User['id']): Promise<Model<User> | null> {
        const user = await this.userModel.findOne(findUser(userId));

        if (!user) return null;

        await user.update({ isDeleted: true });
        return user;
    }
}

export default UserService;
