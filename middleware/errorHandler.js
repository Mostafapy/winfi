/* eslint-disable no-unused-vars */
const { Logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    data: null,
  });
};

module.exports = { errorHandler };
