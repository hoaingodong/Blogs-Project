const logger = require("./logger")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Joi = require("joi")

const requestLogger = (request, response, next) => {
	logger.info("Method:", request.method)
	logger.info("Path:  ", request.path)
	logger.info("Body:  ", request.body)
	logger.info("---")
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: "unknown endpoint"})
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === "CastError") {
		return response.status(400).send({error: "malformatted id"})
	} else if (error.name === "ValidationError") {
		return response.status(400).json({error: error.message})
	} else if (error.name === "JsonWebTokenError") {
		return response.status(401).json({
			error: "invalid token"
		})
	} else if (error.name === "TokenExpiredError") {
		return response.status(401).json({
			error: "token expired"
		})
	} else {
		return response.status(502).json({error: "Error Server"})
	}
	// eslint-disable-next-line no-unreachable
	logger.error(error.message)
	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization")

	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		request["token"] = authorization.substring(7)
	}
	logger.info(request["token"])
	next()
}

const tokenValidator = (request, response, next) => {
	const token = request.token
	if (!token) {
		return response.status(401).json({error: "token missing"})
	}

	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({error: "invalid token"})
	}

	next()
}

const userExtractor = async (request, response, next) => {
	const token = request.token
	const decodedToken = jwt.verify(token, process.env.SECRET)

	const user = await User.findById(decodedToken.id)
	request["user"] = user
	next()
}

const userValidation = async (request, response, next) =>{

	const userSchema = Joi.object().keys({
		username: Joi.string().alphanum().required().min(8),
		name: Joi.string().required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
		avatar: Joi.string().required(),
		role: Joi.string().required().valid("ADMIN", "USER"),
		password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
		repeat_password: Joi.ref("password"),
	})
	const { error } = userSchema.validate(request.body)
	const valid = error == null
	if (valid) {
		next()
	} else {
		const { details } = error
		const message = details.map(i => i.message).join(",")
		console.log("error", message)
		response.status(422).json({ error: message }) }
}

const blogValidation = async (request, response, next) =>{

	const blogSchema = Joi.object().keys({
		title: Joi.string().required(),
		content: Joi.string().required(),
		likes: Joi.number().default(0),
	})
	const { error } = blogSchema.validate(request.body)
	const valid = error == null
	if (valid) {
		next()
	} else {
		const { details } = error
		const message = details.map(i => i.message).join(",")
		console.log("error", message)
		response.status(422).json({ error: message }) }
}

const commentValidation = async (request, response, next) =>{

	const commentSchema = Joi.object().keys({
		content: Joi.string().required(),
		stars: Joi.number().default(5),
		blog_id: Joi.string().required()
	})
	const { error } = commentSchema.validate(request.body)
	const valid = error == null
	if (valid) {
		next()
	} else {
		const { details } = error
		const message = details.map(i => i.message).join(",")
		console.log("error", message)
		response.status(422).json({ error: message }) }
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	tokenValidator,
	userExtractor,
	userValidation,
	blogValidation,
	commentValidation
}