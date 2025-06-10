const Joi = require("joi");

const createPollErrorSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Title is required",
        "string.empty": "Title is required",
    }),
    description: Joi.string().required().messages({
        "any.required": "Description is required",
        "string.empty": "Description is required",
    }),
    options: Joi.required().messages({
        "any.required": "Options are required",
    }),
    expires_at: Joi.date().custom((value, helpers) => {
        const egyptTime = new Date(Date.now() + 3 * 60 * 60 * 1000);
        if (value < egyptTime) {
            return helpers.error("any.invalid");
        }
        return value;
    }).messages({
        "any.invalid": "Expires at must be a date in the future",
    }),

});

module.exports = { createPollErrorSchema };
