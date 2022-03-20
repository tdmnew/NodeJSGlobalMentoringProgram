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

const { route, register } = auth;

const { getUsers, getUser, updateUser, deleteUser } = userController;

router
    .route('/')
    .get(validateQuery, route, getUsers)
    .post(validateCreateUser, register);

router
    .route('/:id')
    .get(validateParams, route, getUser)
    .put(validateUpdateUser, route, updateUser)
    .delete(validateParams, route, deleteUser);

export default router;
