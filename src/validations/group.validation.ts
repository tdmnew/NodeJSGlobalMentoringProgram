import Joi from 'joi';

import CONSTANTS from '../constants';
const {
    NAME_FIELD_EMPTY,
    PERMISSIONS_FIELD_EMPTY,
    PERMISSIONS_PATTERN_INCORRECT,
    USER_IDS_PATTERN_INCORRECT
} = CONSTANTS.VALIDATION.GROUPS;

export const createGroupSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': NAME_FIELD_EMPTY,
        'string.empty': NAME_FIELD_EMPTY
    }),
    permissions: Joi.array()
        .items(
            Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD FILES')
        )
        .required()
        .min(1)
        .max(5)
        .messages({
            'any.required': PERMISSIONS_FIELD_EMPTY,
            'array.min': PERMISSIONS_PATTERN_INCORRECT,
            'array.max': PERMISSIONS_PATTERN_INCORRECT
        })
});

export const addUsersToGroupSchema = Joi.object({
    userIds: Joi.array().items(Joi.string()).required().min(1).messages({
        'any.required': USER_IDS_PATTERN_INCORRECT,
        'array.min': USER_IDS_PATTERN_INCORRECT
    })
});

export const updateGroupSchema = Joi.object({
    name: Joi.string().messages({
        'string.empty': NAME_FIELD_EMPTY
    }),
    permissions: Joi.array()
        .items(
            Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD FILES')
        )
        .min(1)
        .max(5)
        .messages({
            'any.empty': PERMISSIONS_FIELD_EMPTY,
            'array.pattern.incorrect': PERMISSIONS_PATTERN_INCORRECT,
            'array.min': PERMISSIONS_PATTERN_INCORRECT,
            'array.max': PERMISSIONS_PATTERN_INCORRECT
        })
});
