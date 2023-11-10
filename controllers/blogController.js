const UserModel = require("../models/User.js");
const BlogModel = require("../models/Blog.js");
const { userInfo } = require("os");

class BlogController {
  static testing = (req, res) => {
    console.log("Testing");
    res.status(200).json({ name: "Testing" });
  };

  static createBlog = async (req, res) => {
    try {
      console.log("req body", req.body);
      const { title, content, author } = req.body;
      const newPost = new BlogModel({ title, content, author, likes: 0 });
      console.log("new post", newPost);
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static getPosts = async (req, res) => {
    try {
      const posts = await BlogModel.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static postLike = async (req, res) => {
    try {
      console.log("post like api");
      const postId = req.params.id;
      const sessionId = req.sessionId; // Retrieve the session ID from the request
      console.log("postId", postId);
      console.log("sessionId", sessionId);
      let user = await UserModel.findOne({ sessionId });
      console.log("user 41", user);

      if (!user) {
        console.log("44");
        user = new UserModel({ sessionId });

        console.log("inside if condition", user);
        await user.save();
      }
      console.log("user save", user);

      if (!user.likedPosts.includes(postId)) {
        user.likedPosts.push(postId);
        await user.save();
        const post = await BlogModel.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
        res.status(200).json(post);
      } else {
        res.status(400).json({ error: "User already liked this post" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

module.exports = BlogController;
