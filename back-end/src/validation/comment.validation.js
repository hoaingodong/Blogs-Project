const Joi = require("joi")

const commentSchema = Joi.object().keys({
	content: Joi.string().required(),
	stars: Joi.number().default(5),
	blog_id: Joi.string().required()
})

const blogIdSchema = Joi.object().keys({
	blog_id: Joi.string().required()
})

module.exports = {commentSchema, blogIdSchema}