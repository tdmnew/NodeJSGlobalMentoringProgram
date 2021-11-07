import { uuid } from "uuidv4";
import { Request, Response } from "express";
import { Op } from "sequelize";

import User from "../types/user";
import Users from "../models/user.model";

import { USERS_NOT_FOUND, USER_NOT_FOUND } from "../constants";

const getAutoSuggestions = async (loginSubstring: string, limit: number) => {
  const users = await Users.findAll({
    limit,
    where: {
      login: {
        [Op.substring]: loginSubstring,
      },
    },
  });

  return users;
};

export const createUser = (req: Request, res: Response) => {
  const user: User = req.body;
  console.log(user)
  user.id = uuid();
  user.isDeleted = false;

  Users.create(user);
  res.send(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const { loginSubstring = "", limit = 10 } = req.query;

  const sortedList = await getAutoSuggestions(
    loginSubstring as string,
    limit as number
  );

  if (!sortedList || sortedList.length === 0) {
    res.status(404).send(USERS_NOT_FOUND);
  }

  res.json(sortedList);
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id as User["id"];
  const user = Users.findOne({ where: { id, isDeleted: false } });

  if (!user) {
    res.status(404).send(USER_NOT_FOUND);
  }

  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id as User["id"];
  const { login, password, age } = req.body as User;

  const user = await Users.findOne({ where: { id, isDeleted: false } });

  if (!user) {
    res.status(404).send(USER_NOT_FOUND);
  } else {
    if (login) user.update({ login });
    if (password) user.update({ password });
    if (age) user.update({ age });

    res.send(user);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id as User["id"];
  const user = await Users.findOne({ where: { id, isDeleted: false } });

  if (!user) {
    res.status(404).send(USER_NOT_FOUND);
  } else {
    user.update({ isDeleted: true });
    res.send(user);
  }
};
