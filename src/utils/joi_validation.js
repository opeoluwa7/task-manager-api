const Joi = require("joi");

exports.authSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .trim()
        .lowercase()
        .required()
        .messages({
            "string.email": "Invalid email format",
            "any.required": "Email is required"
        }),

    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/)
        .required()
        .messages({
            "string.min": "Password must be at least 8 characters long",
            "string.pattern.base": "Password must include at least one letter, one number, and one special character.",
            "any.required": "Password is required"
        })
}).unknown(true);