const userService = require("../services/user.service")
const bcrypt = require("bcryptjs")
const imageService = require("../services/image.service")

const getAll = async (request, response) => {
	const users = await userService.getAll()
	response.json(users)
}

const createNew = async (request, response, next) => {

	const body = request.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	try {
		const file = request.files[0]
		const avatar = await imageService.createImage(file)

		const user = {
			username: body.username,
			name: body.name,
			email: body.email,
			avatar: avatar,
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

	catch (exception) {
		next(exception)
	}

}

module.exports = {
	getAll,
	createNew
}