import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';

import UserService from '../services/user.service';

import { User as UserModel } from '../models';

import CONSTANTS from '../constants';
const {
    CREDENTIALS_INCORRECT,
    LOGIN_SUCCESSFUL,
    REGISTER_SUCCESSFUL,
    REGISTER_UNSUCCESSFUL,
    REGISTER_USER_EXISTS,
    UNAUTHORIZED
} = CONSTANTS.CONTROLLER_RESPONSE;

import { ENV_VARIABLES } from '.';

const userService = new UserService(UserModel);

const hashPassword = async (originalPass: string): Promise<string | void> => {
    try {
        return await bcrypt.hash(originalPass, 10);
    } catch (err: unknown) {
        if (err instanceof Error) throw new Error(err.message);
    }
};

const comparePassword = async (
    plainPass: string,
    hashedPass?: string
): Promise<boolean | void> => {
    if (!hashedPass) return;

    try {
        return await bcrypt.compare(plainPass, hashedPass);
    } catch (err: unknown) {
        if (err instanceof Error) throw new Error(err.message);
    }
};

const localStrategy = () => {
    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: ENV_VARIABLES.JWT_SECRET
            },
            async (id, cb) => {
                try {
                    const user = await userService.getUser(id);

                    if (user) {
                        return cb(null, user);
                    }

                    return cb(null, false, { message: UNAUTHORIZED });
                } catch (err) {
                    cb(err);
                }
            }
        )
    );

    passport.use(
        'login',
        new Strategy(
            {
                usernameField: 'login',
                passwordField: 'password',
                session: false
            },
            async (login, password, cb) => {
                try {
                    const user = await userService.getUser({
                        userLogin: login
                    });

                    const isValidPass = await comparePassword(
                        password,
                        user?.getDataValue('password')
                    );

                    if (!user || !isValidPass) {
                        return cb(null, false, {
                            message: CREDENTIALS_INCORRECT
                        });
                    }

                    return cb(null, user, {
                        message: LOGIN_SUCCESSFUL
                    });
                } catch (err) {
                    cb(err);
                }
            }
        )
    );

    passport.use(
        'register',
        new Strategy(
            {
                usernameField: 'login',
                passwordField: 'password',
                passReqToCallback: true,
                session: false
            },
            async (req, login, password, cb) => {
                try {
                    const userExists = await userService.getUser({
                        userLogin: login
                    });

                    if (userExists) {
                        return cb(null, false, {
                            message: REGISTER_USER_EXISTS
                        });
                    }

                    const hashedPass = await hashPassword(password);

                    if (!hashedPass) {
                        return cb(null, false, {
                            message: REGISTER_UNSUCCESSFUL
                        });
                    }

                    const user = await userService.createUser({
                        login,
                        password: hashedPass,
                        age: req.body.age
                    });

                    return cb(null, user, {
                        message: REGISTER_SUCCESSFUL
                    });
                } catch (err) {
                    cb(err);
                }
            }
        )
    );
};

export default localStrategy;
