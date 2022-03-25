import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import CONSTANTS from '../../constants';

const { UNAUTHORIZED, FORBIDDEN } = CONSTANTS.CONTROLLER_RESPONSE;

const { NO_AUTH_TOKEN, INVALID_TOKEN, JWT_EXPIRED, JWT_MALFORMED } =
    CONSTANTS.JWT_STATUS;

const secureRoute = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) return next(err);

        switch (info?.message) {
            case JWT_EXPIRED:
            case JWT_MALFORMED:
            case INVALID_TOKEN:
                res.locals.authentication = FORBIDDEN;
                break;
            case NO_AUTH_TOKEN:
                res.locals.authentication = UNAUTHORIZED;
                break;
            default:
                if (!user) res.locals.authentication = UNAUTHORIZED;
                break;
        }
    })(req, res, next);

    switch (res.locals.authentication) {
        case FORBIDDEN:
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({ message: FORBIDDEN });
        case UNAUTHORIZED:
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: UNAUTHORIZED });
        default:
            return next();
    }
};

export default secureRoute;
