const mongoose = require("mongoose");

const connectDB = async (DATABASE_URL) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("connected successfully");
  } catch (error) {
    console.log("error while connecting db", error);
  }
};

module.exports = connectDB;
