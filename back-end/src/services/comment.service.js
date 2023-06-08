const Comment = require("../models/comment.model")
const Blog = require("../models/blog.model")

const getOne = async (id) => {
	const comment = await Comment.findById(id)
	return comment
}

const update = async (id, comment) =>{
	const updatedComment = await Blog.findByIdAndUpdate(id, comment)
	return updatedComment
}

const getAll = async (blog_id) =>{
	console.log(blog_id)
	const comments = await Comment.find({}).populate({path: "blog", match: {
		id: blog_id
	}})
	return comments
}

const createOne = async(comment, user, blog) => {
	const savedComment = await Comment.create({...comment})
	user.comments = user.comments.concat(savedComment._id)
	await user.save()
	blog.comments = blog.comments.concat(savedComment._id)
	await blog.save()
	return savedComment
}

const deleteOne = async(id, user, blog_id ) => {
	const commentToDelete = await Comment.findByIdAndRemove(id)
	user.comments = user.comments.filter(item => String(item) !== id)
	await user.save()
	const blog =  await Blog.findById(blog_id)
	blog.comments = blog.comments.filter(item => String(item) !== id)
	await blog.save()
	return commentToDelete
}

module.exports = {
	getOne,
	update,
	getAll,
	createOne,
	deleteOne
}