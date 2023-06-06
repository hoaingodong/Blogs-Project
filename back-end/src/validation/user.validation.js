const Joi = require("joi")

const userSchema = Joi.object().keys({
	username: Joi.string().alphanum().required().min(8),
	name: Joi.string().required(),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
	avatar: Joi.string().required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
	repeat_password: Joi.ref("password"),
})

module.exports = userSchema

