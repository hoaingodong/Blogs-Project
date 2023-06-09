const express = require("express")
const router = express.Router()
const userController = require("../controllers/users.controller")
const middleware = require("../utils/middleware")
const { celebrate, Segments} = require("celebrate")
const userSchema = require("../validation/user.validation")
const upload = require("../config/multer.config")

router.get("/", middleware.tokenValidator, userController.getAll)
router.post("/", upload.upload.any(), celebrate({[Segments.BODY]:userSchema}),  userController.createNew)

module.exports = router

