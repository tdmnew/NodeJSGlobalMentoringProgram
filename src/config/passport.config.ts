import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import UserService from '../services/user.service';
import { User as UserModel } from '../models';
import { ENV_VARIABLES } from '.';

const userService = new UserService(UserModel);

const localStrategy = () => {
    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: ENV_VARIABLES.JWT_SECRET
            },
            async (id) => {
                try {
                    const user = await userService.getUser(id);
                    if (!user) return null;

                    return user;
                } catch (err) {
                    return err;
                }
            }
        )
    );
};

export default localStrategy;
