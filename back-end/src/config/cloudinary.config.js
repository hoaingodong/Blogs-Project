require("dotenv").config()
const cloudinary = require("cloudinary")

//config APU key, (-in the .env file)
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
})

// upload files with folder
exports.uploads = (file, folder) => {
	return new Promise((resolve) => {
		cloudinary.uploader.upload(
			file,
			(result) => {
				resolve({ url: result.url, id: result.public_id })
			},
			{
				resource_type: "auto",
				folder: folder
			},
		)
	})
}

exports.destroy = (id, response) => {
	return new Promise((resolve) => {
		cloudinary.uploader
			.destroy(id)
			.then((result) => {
				resolve(result)
			})
			.catch((error) => {
				response.status(500).send({
					message: "Failure",
					error,
				})
			})
	})
}


