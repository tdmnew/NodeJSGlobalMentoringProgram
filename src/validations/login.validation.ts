import Joi from "joi";

import { LOGIN_FIELD_EMPTY, PASSWORD_FIELD_EMPTY } from "../constants";

export const loginSchema = Joi.object({
  login: Joi.string().required().messages({
    "any.required": LOGIN_FIELD_EMPTY,
    "string.empty": LOGIN_FIELD_EMPTY,
  }),
  password: Joi.string().required().messages({
    "any.required": PASSWORD_FIELD_EMPTY,
    "string.empty": PASSWORD_FIELD_EMPTY,
  }),
});
