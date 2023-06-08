const express = require("express")
const router = express.Router()
const blogController = require("../controllers/blogs.controller")
const middleware = require("../utils/middleware")
const { celebrate, Segments } = require("celebrate")
const blogSchema = require("../validation/blog.validation")

router.get("/", middleware.tokenValidator, middleware.userExtractor, blogController.getAll)

router.get("/:id", middleware.tokenValidator, blogController.getOne)

router.post("/", celebrate({[Segments.BODY]:blogSchema}), middleware.tokenValidator, middleware.userExtractor, blogController.createOne)

router.put("/:id", celebrate({[Segments.BODY]:blogSchema}), middleware.tokenValidator, blogController.update)

router.delete("/:id", middleware.tokenValidator, middleware.userExtractor, blogController.deleteOne)

module.exports = router