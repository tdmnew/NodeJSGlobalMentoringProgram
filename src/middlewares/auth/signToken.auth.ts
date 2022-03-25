import jwt from 'jsonwebtoken';
import { Response } from 'express';

import User from '../../types/user.type';
import { ENV_VARIABLES } from '../../config';

const signToken = ({}, res: Response, {}) => {
    const user: User = res.locals.user;

    const token = jwt.sign(
        {
            data: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        ENV_VARIABLES.JWT_SECRET ?? ''
    );

    return res.json({ ...user, token });
};

export default signToken;
