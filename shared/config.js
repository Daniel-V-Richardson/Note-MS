const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 8000,
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/",
  usermongoUrl: process.env.USER_MONGO_URL || "mongodb://localhost:27017/user",
  appSecret: process.env.APP_SECRET || "mysupersecretkey",
  userport: process.env.USER_PORT || 8001,
  notesport: process.env.NOTES_PORT || 8002,
  // Add other environment variables as needed
};
