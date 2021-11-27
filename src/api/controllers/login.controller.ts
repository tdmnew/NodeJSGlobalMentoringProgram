import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CREDENTIALS_INCORRECT, LOGIN_SUCCESSFUL } from "../../constants";
import UserService from "../../services/user.service";
import UserModel from "../../models/user.model";

const userService = new UserService(UserModel);

const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;
  const user = await userService.login(login, password);

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).send(CREDENTIALS_INCORRECT);
  }

  res.send(LOGIN_SUCCESSFUL);
};

export default login;
