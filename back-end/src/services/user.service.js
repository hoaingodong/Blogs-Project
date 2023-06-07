const User = require("../models/user.model")

const getAll = async () => {
	const users = await User.find({}).populate("blogs").populate("comments")
	return users
}

const createNew = async (user) => {
	const savedUser = await User.create({...user})
	return savedUser
}

module.exports = {
	getAll,
	createNew
}