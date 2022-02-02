import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import CONSTANTS from '../../constants';
const { CREDENTIALS_INCORRECT, LOGIN_SUCCESSFUL } = CONSTANTS.CONTROLLER_RESPONSE;

import UserService from '../../services/user.service';
import { User as UserModel } from '../../models';

const userService = new UserService(UserModel);

const loginUser = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const user = await userService.login(login, password);

    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).send(CREDENTIALS_INCORRECT);
    }

    return res.send(LOGIN_SUCCESSFUL);
};

export default loginUser;
