const { Logger } = require('../utils/logger');

const errorHandler = (err, req, res) => {
  const errorMessageDetails = err.message.split(' ');

  const moduleName = errorMessageDetails[0];

  const message = errorMessageDetails[2];

  const logger = new Logger(moduleName);

  err.message = message;

  logger.error(err.message, err);

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    data: null,
  });
};

module.exports = { errorHandler };
