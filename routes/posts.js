const express = require("express")
const { getPosts, createPost,  deletePost, createComment} = require("../controllers/posts")
const { checkToken } = require("../middleware/token")
const { imageUpload} = require("../middleware/image")

const postRouter = express.Router()

postRouter.use(checkToken)
postRouter.post("/:id", createComment)
postRouter.delete("/:id", deletePost)
postRouter.get("/", getPosts)
postRouter.post("/", imageUpload, createPost)

module.exports = { postRouter }