const config = require("./utils/config")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const {errors} = require("celebrate")
const bodyParser = require("body-parser")
const v1Router = require("./routes/index.route")
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
// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use("/api/v1", v1Router)
app.use(errors())

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app