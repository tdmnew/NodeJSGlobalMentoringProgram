import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import CONSTANTS from '../../constants';
const { UNAUTHORIZED, FORBIDDEN } = CONSTANTS.CONTROLLER_RESPONSE;

const auth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) next(err);

        if (!req.headers['authorization']) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: UNAUTHORIZED });
        }

        if (info?.message === 'invalid token') {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({ message: FORBIDDEN });
        }

        next();
    })(req, res);
};

export default auth;
