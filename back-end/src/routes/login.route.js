const express = require("express")
const router = express.Router()

router.post("/", (req, res) => {
	res.send("Loggin user with valid data")
})

module.exports = router