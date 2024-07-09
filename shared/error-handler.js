function errorHandler(err, req, res, next) {
    // Handle error
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
  module.exports = errorHandler;