const Comment = require("../models/comment.model")
const Blog = require("../models/blog.model")

const getOne = async (id) => {
	const comment = await Comment.findById(id)
	return (comment)
}

const update = async (id, comment) =>{
	const updatedComment = await Blog.findByIdAndUpdate(id, comment)
	return updatedComment
}

// const getAll = async (user) =>{
//
// }
//
// const createOne = async(comment, user) => {
//
// }
//
// const deleteOne = async(id, user ) => {
//
// }

module.exports = {
	getOne,
	update,
	// getAll,
	// createOne,
	// deleteOne
}