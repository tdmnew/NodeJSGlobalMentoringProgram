import { Request, Response } from 'express';
import { Model } from 'sequelize';
import { StatusCodes } from 'http-status-codes';

import CONSTANTS from '../../constants';

const {
    USERS_NOT_FOUND,
    USER_NOT_FOUND,
    REGISTER_UNSUCCESSFUL,
    REGISTER_USER_EXISTS
} = CONSTANTS.CONTROLLER_RESPONSE;

const { AUTO_SUGGESTIONS } = CONSTANTS.VALIDATION.USERS;

import User from '../../types/user.type';
import { User as UserModel } from '../../models';
import UserService from '../../services/user.service';

const userService = new UserService(UserModel);

export const createUser = async (req: Request, res: Response) => {
    const { user, info, token } = await userService.createUser(req.body);

    if (info === REGISTER_USER_EXISTS) {
        return res.status(StatusCodes.BAD_REQUEST).json({ info });
    }

    if (info === REGISTER_UNSUCCESSFUL) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ info });
    }

    return res.json({ user, info, token });
};

export const getUsers = async (req: Request, res: Response) => {
    const {
        loginSubstring = AUTO_SUGGESTIONS.SUBSTRING,
        limit = AUTO_SUGGESTIONS.LIMIT
    } = req.query;

    const users = await userService.getUsers(
        loginSubstring as string,
        limit as number
    );

    if (!users || users.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send(USERS_NOT_FOUND);
    }

    return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const id = req.params.id as User['id'];
    const user: Model<User> | null = await userService.getUser({ userId: id });

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send(USER_NOT_FOUND);
    }

    return res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id as User['id'];

    const userParams: Partial<User> = {
        login: req.body.login,
        password: req.body.password,
        age: req.body.age
    };

    const user: Model<User> | null = await userService.updateUser(
        userId,
        userParams
    );

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send(USER_NOT_FOUND);
    }

    return res.send(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id as User['id'];
    const user: Model<User> | null = await userService.deleteUser(id);

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send(USER_NOT_FOUND);
    }

    return res.send(user);
};
