const commentsRouter = require("express").Router()
const Comment = require("../models/comment")
const middleware = require("../utils/middleware")
const Blog = require("../models/blog")

commentsRouter.get("/", middleware.tokenValidator, middleware.userExtractor, (request, response) => {

	const user = request.user

	Comment.populate("user").populate("blog").find({user })
		.then(blogs => {
			response.json(blogs)
		})
})

commentsRouter.post("/", middleware.tokenValidator, middleware.userExtractor, async (request, response, next) => {
	const body = request.body

	const user = request.user

	const blog = await Blog.findById(body.blog_id)

	if (!blog) {
		return response.status(400).json({error: "Blog doesn't exist"})
	}

	const comment  = new Comment({
		content: body.content,
		stars: body.stars,
		user: user.id,
		blog: blog.id
	})
	try {
		const savedComment = await comment.save()
		user.comments = user.comments.concat(savedComment._id)
		await user.save().catch(error => next(error))

		blog.comments = blog.comments.concat(savedComment._id)
		await blog.save().catch(error => next(error))

		response.json(savedComment)
	} catch (exception) {
		next(exception)
	}
})

commentsRouter.delete("/:id", middleware.tokenValidator, middleware.userExtractor, async (request, response, next) => {
	try {
		const user = request.user
		const commentToDelete = await Comment.findById(request.params.id)

		if (!commentToDelete) {
			return response.status(400).json({error: "Comment not found"})
		}
		if (commentToDelete.user._id.toString() === user._id.toString()) {
			await Comment.findByIdAndRemove(request.params.id)
			response.status(204).end()
		} else {
			return response.status(401).json({error: "Unauthorized"})
		}
	} catch (exception) {
		next(exception)
	}
})

commentsRouter.put("/:id", middleware.tokenValidator, (request, response, next) => {
	const body = request.body

	const comment = {
		content: body.content,
		stars: body.stars,
	}

	Comment.findByIdAndUpdate(request.params.id, comment, {new: true})
		.then(updatedComment => {
			response.json(updatedComment)
		})
		.catch(error => next(error))
})

module.exports = commentsRouter