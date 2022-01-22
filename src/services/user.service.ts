import { Model } from "sequelize";

import { User as UserModel } from "../models";
import User from "../types/user.type";

import { userAccess } from "../data-access";

interface UserService {
  userModel: typeof UserModel;
}

const { userLogin, findUser, autoSuggestions } = userAccess;

class UserService {
  constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  async login(login: User["login"], password: User["password"]) {
    const user: Model<User> | null = await this.userModel.findOne(
      userLogin(login, password)
    );

    if (!user) return null;

    return user;
  }

  async createUser(userParams: Partial<User>) {
    userParams.isDeleted = false;

    const user = await this.userModel.create(userParams);
    return user;
  }

  async updateUser(userId: User["id"], userParams: Partial<User>) {
    const user = await this.userModel.findOne(findUser(userId));

    if (!user) return null;

    await user.update({
      login: userParams.login,
      password: userParams.password,
      age: userParams.age,
    });

    return user;
  }

  async getUser(userId: User["id"]) {
    const user: Model<User> | null = await this.userModel.findOne(
      findUser(userId)
    );

    return user;
  }

  async getUsers(loginSubstring: string, limit: number) {
    const users: Model<User>[] = await this.userModel.findAll(
      autoSuggestions(loginSubstring, limit)
    );

    if (!users) return null;

    return users;
  }

  async deleteUser(userId: User["id"]) {
    const user = await this.userModel.findOne(findUser(userId));

    if (!user) return null;

    await user.update({ isDeleted: true });
    return user;
  }
}

export default UserService;
