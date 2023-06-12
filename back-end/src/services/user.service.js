const User = require("../models/user.model")

const getAll = async () => {
	const users = await User.find({}).populate("blogs").populate("comments").limit(10).skip(0)
	return users
}

const createNew = async (user) => {
	const savedUser = await User.create({...user})
	return savedUser
}

const updateUser = async (id, user) => {
	const updatedUser = await User.findByIdAndUpdate(id, user)
	return updatedUser
}

module.exports = {
	getAll,
	createNew,
	updateUser
}