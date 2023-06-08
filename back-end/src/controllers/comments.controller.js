const commentService = require("../services/comment.service")
const Blog = require("../models/blog.model")

const getOne = async (request, response, next) => {
	const id = request.params.id

	try {
		const comment = await commentService.getOne(id)
		if (comment) {
			response.json(comment)
		} else {
			return response.status(400).json({error: "Comment not found"})
		}}
	catch (exception){
		next(exception)
	}
}

const update = async (request, response, next) => {
	const body = request.body
	// eslint-disable-next-line no-mixed-spaces-and-tabs
	const id = request.params.id
	const comment = {
		content: body.content,
		stars: body.stars,
	}

	try {
		const updatedComment = await commentService.update(id, comment)
		response.json(updatedComment)
	}
	catch (exception) {
		next(exception)
	}
}

const getAll = async (request, response, next) =>{
	const blog_id = request.body.blog_id
	try {
		const comments = await commentService.getAll(blog_id)
		response.json(comments)
	}
	catch (exception){
		next(exception)
	}
}

const createOne = async (request, response, next) => {
	const body = request.body
	const user = request.user

	const blog = await Blog.findById(body.blog_id)
	if (!blog) {
		return response.status(400).json({error: "Blog doesn't exist"})
	}

	const comment = {
		content: body.content,
		stars: body.stars,
		user: user.id,
		blog: blog.id
	}

	try {
		const savedBlog = await commentService.createOne(comment, user, blog )
		response.status(201).json(savedBlog)
	} catch (exception) {
		next(exception)
	}

}

const deleteOne = async (request, response, next) => {
	const blog_id = request.body.blog_id
	const id = request.params.id
	const user = request.user
	try {
		await commentService.deleteOne(id, user, blog_id)
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