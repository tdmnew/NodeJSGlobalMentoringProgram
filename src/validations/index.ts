import { createValidator } from 'express-joi-validation';

import { createUserSchema, updateUserSchema } from './user.validation';

import {
    createGroupSchema,
    updateGroupSchema,
    addUsersToGroupSchema
} from './group.validation';

import { loginSchema } from './login.validation';
import paramsScehma from './params.validation';
import querySchema from './query.validation';

const validator = createValidator();

export const validateLogin = validator.body(loginSchema);

export const validateCreateUser = validator.body(createUserSchema);
export const validateUpdateUser = validator.body(updateUserSchema);

export const validateCreateGroup = validator.body(createGroupSchema);
export const validateUpdateGroup = validator.body(updateGroupSchema);
export const validateAddUsersToGroup = validator.body(addUsersToGroupSchema);

export const validateParams = validator.params(paramsScehma);
export const validateQuery = validator.query(querySchema);
