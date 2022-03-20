import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ENV_VARIABLES } from '../../config';

const login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err) next(err);

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).send(info);
        }

        const token = jwt.sign(
            { data: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
            ENV_VARIABLES.JWT_SECRET ?? ''
        );

        return res.json({
            info,
            user,
            token
        });
    })(req, res);
};

export default login;
