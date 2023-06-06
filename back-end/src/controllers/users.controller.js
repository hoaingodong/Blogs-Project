const bcrypt = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/user.model")
const middleware = require("../utils/middleware")

usersRouter.post("/", middleware.userValidation, async (request, response, next) => {
	const body = request.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		email: body.email,
		avatar: body.avatar,
		role: body.role,
		passwordHash,
	})

	const savedUser = await user.save().catch(error => next(error))

	response.status(201).json(savedUser)
})

usersRouter.get("/", middleware.tokenValidator, async (request, response) => {
	const users = await User.find({}).populate("blogs").populate("comments")
	response.json(users)
})

module.exports = usersRouter