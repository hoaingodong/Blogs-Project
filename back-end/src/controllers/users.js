const bcrypt = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/user")
const middleware = require("../utils/middleware")

usersRouter.post("/", async (request, response, next) => {
	const { username, name, email, avatar, role, password } = request.body

	if (request.body.password.length < 3) {
		return response.status(400).json({ error: "User validation failed: username: Path password is shorter than the minimum allowed length (3)" })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		email,
		avatar,
		role,
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