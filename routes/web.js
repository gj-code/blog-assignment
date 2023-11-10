const express = require("express");
const BlogController = require("../controllers/blogController");

const router = express.Router();

router.get("/testing", BlogController.testing);
router.post("/posts", BlogController.createBlog);
router.get("/posts", BlogController.getPosts);
router.post("/posts/:id/like", BlogController.postLike);

module.exports = router;
