const express = require("express")
const router = express.Router()
const middleware = require("../utils/middleware")
const { celebrate, Segments } = require("celebrate")
const commentController =  require("../controllers/comments.controller")
const {commentSchema, blogIdSchema} = require("../validation/comment.validation")

router.get("/:id", celebrate({[Segments.BODY]:blogIdSchema}), middleware.tokenValidator, commentController.getOne)

router.put("/:id", celebrate({[Segments.BODY]:commentSchema}), middleware.tokenValidator, commentController.update)

router.get("/", middleware.tokenValidator, commentController.getAll)

router.post("/", celebrate({[Segments.BODY]:commentSchema}), middleware.tokenValidator, middleware.userExtractor, commentController.createOne)

router.delete("/:id", celebrate({[Segments.BODY]:blogIdSchema}), middleware.tokenValidator, middleware.userExtractor, commentController.deleteOne)

module.exports = router