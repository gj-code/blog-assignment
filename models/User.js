const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  sessionId: { type: String }, // You can use a session ID or client-side identifier
  likedPosts: [mongoose.Schema.Types.ObjectId],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
