const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  author: { type: String },
  likes: { type: Number },
});

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
