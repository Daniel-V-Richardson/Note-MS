const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss", // Customize the timestamp format as needed
    }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    // Add additional transports as needed (file, database, etc.)
  ],
});

module.exports = logger;
