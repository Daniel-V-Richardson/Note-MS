const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../logger');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      throw new Error('Token not provided');
    }

    const decoded = jwt.verify(token, "mysupersecretkey");
    req.userId = decoded._id;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    res.status(401).send({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
