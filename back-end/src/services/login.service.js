const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")

const login = async (username, password) => {

	const user = await User.findOne({ username })

	const passwordCorrect = user.comparePassword(password)

	if (!(user && passwordCorrect)) {
		throw new Error("invalid username or password")
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	const token = jwt.sign(
		userForToken,
		process.env.SECRET,
		{ expiresIn: 60*60 }
	)

	return {token, user}
}

module.exports = {
	login
}