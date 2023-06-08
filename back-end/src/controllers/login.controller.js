const loginService = require("../services/login.service")

const login = async (request, response, next)=> {
	const { username, password } = request.body

	try {
		const {token, user} = await loginService.login(username, password)
		response
			.status(200)
			.send({token, username: user.username, name: user.name})
	}
	catch (exception) {
		next(exception)
	}

}

module.exports = {login}