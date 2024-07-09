// gateway/src/index.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('../../shared/logger');
const errorHandler = require('../../shared/error-handler');
const config = require('../../shared/config');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Proxy middleware configuration
app.use('/user', createProxyMiddleware({ target: 'http://localhost:8001', changeOrigin: true }));
app.use('/notes', createProxyMiddleware({ target: 'http://localhost:8002', changeOrigin: true }));

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Gateway server started on port ${PORT}`);
});