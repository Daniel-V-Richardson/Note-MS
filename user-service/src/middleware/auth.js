const authMiddleware = require("../../../shared/middleware/auth");
const User = require("../models/User");
const logger = require("../../../shared/logger");

const userAuthMiddleware = async (req, res, next) => {
  await authMiddleware(req, res, async () => {
    try {
      const user = await User.findOne({
        _id: req.userId,
        email: req.userEmail,
      });

      if (!user) {
        throw new Error("User not found");
      }

      req.user = user;
      next();
    } catch (error) {
      logger.error(`Authentication error: ${error.message}`);
      res.status(401).send({ error: "Authentication failed" });
    }
  });
};

module.exports = userAuthMiddleware;
