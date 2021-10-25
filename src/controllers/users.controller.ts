import { uuid } from "uuidv4";
import { Request, Response } from "express";

import { User } from "../interfaces";
import { data } from "../db";
import { USERS_NOT_FOUND, USER_NOT_FOUND } from "../constants";

const getAutoSuggestions = (loginSubstring: string, limit: number) => {
  return data
    .filter((user) => user.login.includes(loginSubstring))
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limit);
};

export const createUser = (req: Request, res: Response) => {
  let user: User = req.body;
  user.id = uuid();
  user.isDeleted = false;

  data.push(user);
  res.send(user);
};

export const getUsers = (req: Request, res: Response) => {
  const { loginSubstring = "", limit = 10 } = req.query;
  const sortedList: User[] | undefined = getAutoSuggestions(
    loginSubstring as string,
    limit as number
  );

  if (!sortedList || sortedList.length === 0) {
    res.status(404).send(USERS_NOT_FOUND);
  } else {
    res.json(sortedList);
  }
};

export const getUser = (req: Request, res: Response) => {
  const id = req.params.id as User["id"];
  const user: User | undefined = data.find((user) => user.id === id);

  if (!user || user.isDeleted) {
    res.status(404).send(USER_NOT_FOUND);
  } else {
    res.json(user);
  }
};

export const updateUser = (req: Request, res: Response) => {
  const id = req.params.id as User["id"];
  const { login, password, age } = req.body as User;

  let user: User | undefined = data.find((user) => user.id === id);

  if (!user || user.isDeleted) {
    res.status(404).send(USER_NOT_FOUND);
  } else {
    if (login) {
      user.login = login;
    }

    if (password) {
      user.password = password;
    }

    if (age) {
      user.age = age;
    }

    data.splice(data.indexOf(user), 1, user);

    res.send(user);
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id as User["id"];
  let user: User | undefined = data.find((user) => user.id === id);

  if (!user || user.isDeleted) {
    res.status(404).send(USER_NOT_FOUND);
  } else {
    user.isDeleted = true;
    data.splice(data.indexOf(user), 1, user);
    res.send(user);
  }
};
