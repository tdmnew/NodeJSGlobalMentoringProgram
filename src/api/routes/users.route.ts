import { Router } from 'express';

import auth from '../../middlewares/auth';

import {
    validateCreateUser,
    validateUpdateUser,
    validateQuery,
    validateParams
} from '../../validations';
import { userController } from '../controllers';

const router = Router();

const { createUser, getUsers, getUser, updateUser, deleteUser } =
    userController;

const { signToken, secureRoute } = auth;

router
    .route('/')
    .get(validateQuery, secureRoute, getUsers)
    .post(validateCreateUser, createUser, signToken);

router
    .route('/:id')
    .get(validateParams, secureRoute, getUser)
    .put(validateUpdateUser, secureRoute, updateUser)
    .delete(validateParams, secureRoute, deleteUser);

export default router;
