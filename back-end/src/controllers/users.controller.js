const userService = require("../services/user.service")
const bcrypt = require("bcryptjs")

const getAll = async (request, response) => {
	const users = await userService.getAll()
	response.json(users)
}

const createNew = async (request, response, next) =>{
	const body = request.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = {
		username: body.username,
		name: body.name,
		email: body.email,
		avatar: body.avatar,
		role: body.role,
		passwordHash,
	}
	try {
		const savedUser = await userService.createNew(user)
		response.status(201).json(savedUser)
	}
	catch (exception) {
		next(exception)
	}
}

module.exports = {
	getAll,
	createNew
}