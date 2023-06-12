const express = require("express")
const router = express.Router()
const { celebrate, Segments } = require("celebrate")
const commentController =  require("../controllers/comments.controller")
const {commentSchema, blogIdSchema} = require("../validation/comment.validation")

router.get("/:id", celebrate({[Segments.BODY]:blogIdSchema}), commentController.getOne)

router.put("/:id", celebrate({[Segments.BODY]:commentSchema}), commentController.update)

router.get("/", commentController.getAll)

router.post("/", celebrate({[Segments.BODY]:commentSchema}), commentController.createOne)

router.delete("/:id", celebrate({[Segments.BODY]:blogIdSchema}), commentController.deleteOne)

module.exports = router