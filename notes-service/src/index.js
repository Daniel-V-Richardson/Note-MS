// user-service/src/index.js
const express = require("express");
const logger = require("../../shared/logger");
const errorHandler = require("../../shared/error-handler");
const config = require("../../shared/config");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const noteRouter = require("./routes/note");

// Use Routes

app.use("/api/v1", noteRouter);

// Simple route for testing if the service is Up
app.get("/", (req, res) => {
  res.json({ message: "Notes service is up and running!" });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = config.notesport;
app.listen(PORT, () => {
  logger.info(`Notes service started on port ${PORT}`);
});
