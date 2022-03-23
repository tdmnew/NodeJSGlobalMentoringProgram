import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import CONSTANTS from '../../constants';
const { CREDENTIALS_INCORRECT } = CONSTANTS.CONTROLLER_RESPONSE;

import UserService from '../../services/user.service';
import { User as UserModel } from '../../models';

const userService = new UserService(UserModel);

const loginUser = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const { user, token, info } = await userService.login(login, password);

    if (info === CREDENTIALS_INCORRECT) {
        return res.status(StatusCodes.BAD_REQUEST).json({ info });
    }

    return res.json({ user, token, info });
};

export default loginUser;
