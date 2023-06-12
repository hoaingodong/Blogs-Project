const userService = require("../services/user.service")
const bcrypt = require("bcryptjs")
const imageService = require("../services/image.service")
const cloudinary = require("cloudinary")
const User = require("../models/user.model")

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

const updateUser = async (request, response, next) => {
	const id = request.params.id
	const user = await User.findById(id)
	const idCloudinary = user.avatar.id

	await cloudinary.uploader
		.destroy(idCloudinary)

	const body = request.body

	const file = request.files[0]
	const avatar = await imageService.createImage(file)

	const updateUser = {
		username: body.username,
		name: body.name,
		email: body.email,
		avatar: avatar,
		passwordHash: user.passwordHash
	}

	try {
		const updatedUser = await userService.updateUser(id, updateUser)
		response.json(updatedUser)
	}
	catch(exception)
	{
		next(exception)
	}

}

module.exports = {
	getAll,
	createNew,
	updateUser
}