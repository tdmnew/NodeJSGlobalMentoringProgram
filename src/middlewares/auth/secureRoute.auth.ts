import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import CONSTANTS from '../../constants';

const { UNAUTHORIZED, FORBIDDEN } = CONSTANTS.CONTROLLER_RESPONSE;

const { NO_AUTH_TOKEN, INVALID_TOKEN, JWT_EXPIRED, JWT_MALFORMED } =
    CONSTANTS.JWT_STATUS;

const secureRoute = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);

        switch (info?.message) {
            case JWT_EXPIRED:
            case JWT_MALFORMED:
            case INVALID_TOKEN:
                return res
                    .status(StatusCodes.FORBIDDEN)
                    .json({ message: FORBIDDEN });
            case NO_AUTH_TOKEN:
                return res
                    .status(StatusCodes.UNAUTHORIZED)
                    .json({ message: UNAUTHORIZED });
            default:
                if (!user) {
                    return res
                        .status(StatusCodes.UNAUTHORIZED)
                        .json({ message: UNAUTHORIZED });
                }
                return;
        }
    })(req, res, next);

    if (!res.headersSent) {
        return next();
    }
};

export default secureRoute;
