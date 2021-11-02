import Joi from "joi";

const querySchema = Joi.object({
  loginSubstring: Joi.string(),
  limit: Joi.number(),
});

export default querySchema;
