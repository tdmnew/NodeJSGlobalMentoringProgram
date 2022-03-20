import { Router } from 'express';

import auth from '../../middlewares/auth';

import {
    validateCreateGroup,
    validateUpdateGroup,
    validateAddUsersToGroup,
    validateQuery,
    validateParams
} from '../../validations';
import { groupController } from '../controllers';

const router = Router();

const { route } = auth;

const {
    getGroup,
    getGroups,
    updateGroup,
    createGroup,
    deleteGroup,
    addUsersToGroup
} = groupController;

router
    .route('/')
    .get(validateQuery, route, getGroups)
    .post(validateCreateGroup, route, createGroup);

router
    .route('/:id/users/add-users-to-group')
    .post(validateParams, validateAddUsersToGroup, route, addUsersToGroup);

router
    .route('/:id')
    .get(validateParams, route, getGroup)
    .put(validateUpdateGroup, route, updateGroup)
    .delete(validateParams, route, deleteGroup);

export default router;
