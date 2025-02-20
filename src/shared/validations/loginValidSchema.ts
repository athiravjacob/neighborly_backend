import Joi from "joi"
export const loginValidSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
      
})