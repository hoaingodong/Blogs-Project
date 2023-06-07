const express = require("express")
const router = express.Router()
const userController = require("../controllers/users.controller")
const middleware = require("../utils/middleware")
const { celebrate, Segments} = require("celebrate")
const userSchema = require("../validation/user.validation")

router.get("/", middleware.tokenValidator, userController.getAll)
router.post("/", celebrate({[Segments.BODY]:userSchema}), userController.createNew)

module.exports = router

