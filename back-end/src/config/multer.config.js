const multer = require("multer")
// const path = require("path")

//multer.diskStorage() creates a storage space for storing files.
const storage = multer.diskStorage({
	// destination: (req, file, cb) => {
	// 	cb(null, path.join(__dirname, "../files"))
	// },
	filename: function (req, file, cb) {
		cb(null, new Date().toDateString() + "-" + file.originalname)
	},
})

//filter type image before upload
const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg")
	{
		cb(null, true)
	}
	else {
		cb({message: "Unsupported file format"}, false)
		throw new Error("File is not supported")
	}}

//can upload by multer, é hé hé
const upload = multer(({
	storage:storage,
	limits: {fileSize: 1024*1024},
	fileFilter: fileFilter
}))

module.exports = {upload}