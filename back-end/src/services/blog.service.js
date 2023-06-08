const Blog = require("../models/blog.model")

const getOne = async (id) => {
	const blog = await Blog.findById(id)
	return blog
}

const update = async (id, blog) =>{
	const updatedBlog = await Blog.findByIdAndUpdate(id, blog)
	return updatedBlog
}

const getAll = async (user) =>{
	const blogs = await Blog.find({user }).populate("user").populate("comments").limit(10).skip(0)
	return blogs
}

const createOne = async(blog, user) => {
	const savedBlog = await Blog.create({...blog})
	console.log(savedBlog)
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	return savedBlog
}

const deleteOne = async(id, user ) => {
	const blogToDelete = await Blog.findByIdAndRemove(id)
	user.blogs = user.blogs.filter(item => String(item) !== id)
	await user.save()
	return blogToDelete
}

module.exports = {
	getOne,
	update,
	getAll,
	createOne,
	deleteOne
}