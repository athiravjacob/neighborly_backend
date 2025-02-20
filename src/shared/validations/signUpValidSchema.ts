import Joi from "joi";

export const signUpValidSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().pattern(/^(?!\s+$)[A-Za-z\s]+$/).
    messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 30 characters",
        "string.pattern.base": "Name should only contain alphabets without digits, or special characters.",

    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
      }),
    password: Joi.string().min(6).required().pattern(/^(?=.*\d)(?=.*[A-Za-z])[^\s]+$/)
      .messages({
        "string.empty": "Password is required",
          "string.min": "Password must be at least 6 characters long",
          "string.pattern.base": "Password must contain at least one digit and it should not have spaces.",
      }),
      phone: Joi.string()
        .pattern(/^\d{10}$/)
        .required()
        .messages({
        "string.empty": "Phone number is required.",
        "string.pattern.base": "Phone number must be 10 digits.",
    }),
})