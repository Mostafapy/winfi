const connectionPoolPromise = async (connectionPool, logger, moduleName) => {
  try {
    if (process.env.NODE_ENV == 'production') {
      const pool = await connectionPool;
      return Promise.resolve(pool);
    }

    return Promise.resolve(connectionPool);
  } catch (err) {
    logger.error(err.message, err);
    err.message = `${moduleName},${err.message}`;
    return Promise.reject(err);
  }
};

module.exports = { connectionPoolPromise };
