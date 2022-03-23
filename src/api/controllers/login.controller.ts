<<<<<<< HEAD
import { Request, Response, NextFunction } from 'express';
=======
import { Request, Response } from 'express';
>>>>>>> Added tests for user controller
import { StatusCodes } from 'http-status-codes';

import CONSTANTS from '../../constants';
const { CREDENTIALS_INCORRECT } = CONSTANTS.CONTROLLER_RESPONSE;

import UserService from '../../services/user.service';
import { User as UserModel } from '../../models';

const userService = new UserService(UserModel);

<<<<<<< HEAD
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body;
    const { user, info } = await userService.login(login, password);
=======
const loginUser = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const { user, token, info } = await userService.login(login, password);
>>>>>>> Added tests for user controller

    if (info === CREDENTIALS_INCORRECT) {
        return res.status(StatusCodes.BAD_REQUEST).json({ info });
    }

<<<<<<< HEAD
    res.locals.user = { user, info };

    return next();
=======
    return res.json({ user, token, info });
>>>>>>> Added tests for user controller
};

export default loginUser;
