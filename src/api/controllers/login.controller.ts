import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import CONSTANTS from '../../constants';
const { CREDENTIALS_INCORRECT } = CONSTANTS.CONTROLLER_RESPONSE;

import UserService from '../../services/user.service';
import { User as UserModel } from '../../models';

const userService = new UserService(UserModel);

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body;
    const { user, info } = await userService.login(login, password);

    if (info === CREDENTIALS_INCORRECT) {
        return res.status(StatusCodes.BAD_REQUEST).json({ info });
    }

    res.locals.user = { user, info };

    return next();
};

export default loginUser;
