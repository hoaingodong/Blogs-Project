const express = require("express")
const router = express.Router()
const blogController = require("../controllers/blogs.controller")
const { celebrate, Segments } = require("celebrate")
const blogSchema = require("../validation/blog.validation")

router.get("/", blogController.getAll)

router.get("/:id", blogController.getOne)

router.post("/", celebrate({[Segments.BODY]:blogSchema}), blogController.createOne)

router.put("/:id", celebrate({[Segments.BODY]:blogSchema}), blogController.update)

router.delete("/:id", blogController.deleteOne)

module.exports = router