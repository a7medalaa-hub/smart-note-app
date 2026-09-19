const Joi = require("joi");

const registerSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .required()
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
});

const forgetPasswordSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
});

const resetPasswordSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    otp: Joi.string()
        .length(6)
        .pattern(/^\d+$/)
        .required(),

    newPassword: Joi.string()
        .min(8)
        .required()
});

module.exports = {
    registerSchema,
    loginSchema,
    forgetPasswordSchema,
    resetPasswordSchema
};