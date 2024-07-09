const mongoose = require("mongoose");
const config = require("../../../shared/config");
const logger = require("../../../shared/logger");

const selectUserDb = async (req, res, next) => {
  try {
    const userId = req.userId;
    const dbName = userId.toString();
    const dbUrl = `${config.mongoUrl}/${dbName}`;

    if (mongoose.connections.find((conn) => conn.name === dbName)) {
      req.db = mongoose.connection.useDb(dbName);
    } else {
      const connection = await mongoose.createConnection(dbUrl);
      req.db = connection.useDb(dbName);
    }

    next();
  } catch (error) {
    logger.error(`Error in selectUserDb middleware: ${error.message}`);
    res.status(500).send({ error: "Database connection failed" });
  }
};

module.exports = selectUserDb;
