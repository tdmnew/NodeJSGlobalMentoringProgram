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

const {
    getGroup,
    getGroups,
    updateGroup,
    createGroup,
    deleteGroup,
    addUsersToGroup
} = groupController;

const { secureRoute } = auth;

router
    .route('/')
    .get(validateQuery, secureRoute, getGroups)
    .post(validateCreateGroup, secureRoute, createGroup);

router
    .route('/:id/users/add-users-to-group')
    .post(
        validateParams,
        validateAddUsersToGroup,
        secureRoute,
        addUsersToGroup
    );

router
    .route('/:id')
    .get(validateParams, secureRoute, getGroup)
    .put(validateUpdateGroup, secureRoute, updateGroup)
    .delete(validateParams, secureRoute, deleteGroup);

export default router;
