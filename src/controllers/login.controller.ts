import { Request, Response } from "express";

import Users from '../models/user.model';

import { CREDENTIALS_INCORRECT, LOGIN_SUCCESSFUL } from "../constants";

const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;
  const user = await Users.findOne({ where: { login, password } });

  if (!user) {
    res.status(400).send(CREDENTIALS_INCORRECT);
  }

  res.send(LOGIN_SUCCESSFUL);
};

export default login;
