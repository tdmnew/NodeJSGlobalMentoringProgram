import Joi from "joi";

const paramsScehma = Joi.object({
  id: Joi.string().required(),
});

export default paramsScehma;
