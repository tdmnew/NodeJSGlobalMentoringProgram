import { Request, Response } from "express";

import { User } from "../interfaces";
import { data } from "../db";

import { CREDENTIALS_INCORRECT, LOGIN_SUCCESSFUL } from "../constants";

export const login = (req: Request, res: Response) => {
  const { login, password } = req.body;
  const user: User | undefined = data.find((user) => user.login === login);

  if(!user || user.password !== password) {
    res.status(400).send(CREDENTIALS_INCORRECT);
  } else {
    res.send(LOGIN_SUCCESSFUL);
  }
};
