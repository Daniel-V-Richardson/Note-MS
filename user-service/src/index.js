// user-service/src/index.js
const express = require("express");
const logger = require("../../shared/logger");
const errorHandler = require("../../shared/error-handler");
const config = require("../../shared/config");
require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user");

app.use("/api/v1", userRouter);


// Simple route for testing
app.get("/api/v1/", (req, res) => {
  res.json({ message: "User service is up and running!" });
});


// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = config.userport;
app.listen(PORT, () => {
  logger.info(`User service started on port ${PORT}`);
});
