const Joi = require("joi");

const signupUserErrorSchema = Joi.object({
    name: Joi.string().trim().min(3).max(30).required().messages({
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Invalid email address'
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 6 characters long'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'any.only': 'Password and confirm password do not match'
    }),

});

const loginUserErrorSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Invalid email address'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
});
module.exports = { signupUserErrorSchema, loginUserErrorSchema };