const cloudinary = require("../config/cloudinary.config")
const fs = require("fs")

const createImage = async (file) => {
	const uploader = async (path) => await  cloudinary.uploads(path, "Avatars")
	const urls = []
	const {path} = file
	const newPath = await uploader(path)
	urls.push(newPath)
	fs.unlinkSync(path)

	return urls[0]
}

module.exports = {createImage}