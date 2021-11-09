import { Request, Response } from "express";
import { Model } from "sequelize";

import { USERS_NOT_FOUND, USER_NOT_FOUND } from "../../constants";

import User from "../../types/user.type";
import UserModel from "../../models/user.model";
import UserService from "../../services/user.service";

const userService = new UserService(UserModel);

export const createUser = async (req: Request, res: Response) => {
  const user: User = req.body;
  
  const createdUser: Model<User> = await userService.createUser(user);
  res.send(createdUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const { loginSubstring = "", limit = 10 } = req.query;
  const users = await userService.getUsers(
    loginSubstring as string,
    limit as number
  );

  if (!users || users.length === 0) {
    res.status(404).send(USERS_NOT_FOUND);
  }

  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id as User["id"];
  const user: Model<User> | null = await userService.getUser(id);

  if (!user) {
    res.status(404).send(USER_NOT_FOUND);
  }

  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id as User["id"];

  const userParams: Partial<User> = {
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
  };

  const user: Model<User> | null = await userService.updateUser(
    userId,
    userParams
  );

  if (!user) {
    res.status(404).send(USER_NOT_FOUND);
  } else {
    res.send(user);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id as User["id"];
  const user: Model<User> | null = await userService.deleteUser(id);

  if (!user) {
    res.status(404).send(USER_NOT_FOUND);
  } else {
    res.send(user);
  }
};
