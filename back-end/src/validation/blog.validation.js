const Joi = require("joi")

const blogSchema = Joi.object().keys({
	title: Joi.string().required(),
	content: Joi.string().required(),
	likes: Joi.number().default(0),
})

module.exports = blogSchema

