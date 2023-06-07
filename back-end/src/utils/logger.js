const { createLogger, format, transports } = require("winston")
// Import mongodb
require("winston-mongodb")

const config = require("./config")

module.exports = createLogger({
	// files transport
	transports: [
		new transports.File({
			filename: "logs/error.log",
			format:format.combine(
				format.timestamp({format: "MMM-DD-YYYY HH:mm:ss"}),
				format.align(),
				format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
			),
			level: "error"
		}),
		new transports.File({
			filename: "logs/combined.log",
			format:format.combine(
				format.timestamp({format: "MMM-DD-YYYY HH:mm:ss"}),
				format.align(),
				format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
			),
			level: "info"
		}),
		// MongoDB transport
		new transports.MongoDB({
			level: "error",
			db : config.MONGODB_URI,
			options: {
				useUnifiedTopology: true
			},
			collection: "server_logs",
			format: format.combine(
				format.timestamp(),
				format.json())
		})
	]
})