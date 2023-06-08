const config = require("./utils/config")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const loginRouter = require("./routes/login.route")
const blogsRouter = require("./routes/blog.route")
const usersRouter = require("./routes/user.route")
const commentsRouter = require("./routes/comment.route")
const {errors} = require("celebrate")
const bodyParser = require("body-parser")


mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB")
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message)
	})

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use(bodyParser.json())
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/comments", commentsRouter)
app.use(errors())

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app