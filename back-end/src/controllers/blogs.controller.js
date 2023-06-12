const blogService = require("../services/blog.service")
const getOne = async (request, response, next) => {

	const id = request.params.id

	try {
		const blog = await blogService.getOne(id)
		if (blog) {
			response.json(blog)
		} else {
			return response.status(404).json({error: "Blog not found"})
		}
	}

	catch(exception) {
		next(exception)
	}
}

const update = async (request, response, next) => {
	const body = request.body
	// eslint-disable-next-line no-mixed-spaces-and-tabs
 	const id = request.params.id
	const blog = {
		content: body.content,
		title: body.title,
		likes: body.likes,
	}

	try {
		const updatedBlog = await blogService.update(id, blog)
		response.json(updatedBlog)
	}
	catch (exception) {
		next(exception)
	}
}

const getAll = async (request, response, next) =>{
	const user = request.user
	try {
		const blogs = await blogService.getAll(user)
		response.json(blogs)
	}
	catch (exception){
		next(exception)
	}

}

const createOne = async (request, response, next) =>{
	const body = request.body
	const user = request.user
	const blog = {
		title: body.title,
		content: body.content,
		likes: body.likes,
		user: user.id,
	}

	try {
		const savedBlog = await blogService.createOne(blog, user)
		response.status(201).json(savedBlog)
	} catch (exception) {
		next(exception)
	}

}

const deleteOne = async (request, response, next) => {
	const id = request.params.id
	const user = request.user
	try {
		await blogService.deleteOne(id, user)
		response.status(204).json()
	}
	catch (exception) {
		next(exception)
	}
}

module.exports = {
	getOne,
	update,
	getAll,
	createOne,
	deleteOne
}