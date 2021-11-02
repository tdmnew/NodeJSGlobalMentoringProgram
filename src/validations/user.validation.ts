import Joi from "joi";

const hasLettersAndNumbers = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])");

import {
  LOGIN_FIELD_EMPTY,
  PASSWORD_FIELD_EMPTY,
  PASSWORD_PATTERN_INCORRECT,
  AGE_FIELD_EMTPY,
  AGE_PATTERN_INCORRECT,
} from "../constants";

export const createUserSchema = Joi.object({
  login: Joi.string().required().messages({
    "any.required": LOGIN_FIELD_EMPTY,
    "string.empty": LOGIN_FIELD_EMPTY,
  }),
  password: Joi.string().required().pattern(hasLettersAndNumbers).messages({
    "string.pattern.base": PASSWORD_PATTERN_INCORRECT,
    "any.required": PASSWORD_FIELD_EMPTY,
    "string.empty": PASSWORD_FIELD_EMPTY,
  }),
  age: Joi.number().required().min(4).max(130).messages({
    "number.min": AGE_PATTERN_INCORRECT,
    "number.max": AGE_PATTERN_INCORRECT,
    "any.required": AGE_FIELD_EMTPY,
    "number.empty": AGE_FIELD_EMTPY,
  }),
});

export const updateUserSchema = Joi.object({
  login: Joi.string().messages({
    "string.empty": LOGIN_FIELD_EMPTY,
  }),
  password: Joi.string().pattern(hasLettersAndNumbers).messages({
    "string.pattern.base": PASSWORD_PATTERN_INCORRECT,
    "string.empty": PASSWORD_FIELD_EMPTY,
  }),
  age: Joi.number().min(4).max(130).messages({
    "number.min": AGE_PATTERN_INCORRECT,
    "number.max": AGE_PATTERN_INCORRECT,
    "number.empty": AGE_FIELD_EMTPY,
  }),
});
