const mongoose = require("mongoose");
const config = require("../../../shared/config");
const logger = require("../../../shared/logger");

mongoose
  .connect(config.usermongoUrl)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB:", err);
  });

module.exports = mongoose;
