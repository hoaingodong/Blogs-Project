const User = require("../models/user.model")

const login = async (username, password) => {

	const user = await User.findOne({ username })

	const passwordCorrect = user === null
		? false
		: await user.comparePassword(password)

	if (!(user && passwordCorrect)) {
		throw new Error("invalid username or password")
	}

	const token = await user.getJwtToken()

	return {token, user}
}

module.exports = {
	login
}