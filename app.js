const express = require("express");
const connectDB = require("./db/connectdb");
const web = require("./routes/web.js");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 8000;
const db_url = process.env.DB_URL || "mongodb://127.0.0.1:27017/blogdb";

connectDB(db_url);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Max requests per IP
});

app.use(apiLimiter);

function generateSessionId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const sessionIdLength = 32; // You can adjust the length as needed
  let sessionId = "";

  for (let i = 0; i < sessionIdLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sessionId += characters.charAt(randomIndex);
  }

  return sessionId;
}

app.use((req, res, next) => {
  const sessionId = req?.cookies?.sessionId || generateSessionId(); // Implement generateSessionId() as needed
  res.cookie("sessionId", sessionId, { maxAge: 3600000 }); // Set an expiration time (e.g., 1 hour)
  req.sessionId = sessionId;
  next();
});

app.use("/", web);

app.listen(port, () => {
  console.log(`Server listening at https://localhost:${port}`);
});
