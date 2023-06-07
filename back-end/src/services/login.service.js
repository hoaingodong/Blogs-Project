const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")

const login = async (username, password) => {

	const user = await User.findOne({ username })

	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		throw new Error()
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

	return token
}

module.exports = {
	login
}