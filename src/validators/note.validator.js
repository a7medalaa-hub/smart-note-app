const Joi = require("joi");

const createNoteSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(1)
        .max(200)
        .required(),

    content: Joi.string()
        .trim()
        .min(1)
        .required()
});

module.exports = {
    createNoteSchema
};