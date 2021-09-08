const mysql = require('mysql2');

const connectionPoolPromise = async (connectionPool, logger, moduleName) => {
  try {
    if (process.env.NODE_ENV == 'production') {
      const pool = await connectionPool;
      // [TODO] remove it
      console.log(pool);
      return Promise.resolve(pool);
    }

    return Promise.resolve(connectionPool);
  } catch (err) {
    logger.error(err.message, err);
    err.message = `${moduleName},${err.message}`;
    return Promise.reject(err);
  }
};

const sshDBRemoteConnection = (sshConf, sqlConf, sshClient) => {
  return new Promise((resolve, reject) => {
    sshClient
      .on('ready', function () {
        sshClient.forwardOut(
          '127.0.0.1',
          24000,
          '127.0.0.1',
          3306,
          function (err, stream) {
            if (err) reject(err);

            sqlConf.stream = stream;
            resolve(mysql.createPool(sqlConf).promise());
          },
        );
      })
      .connect(sshConf);
  });
};

module.exports = { connectionPoolPromise, sshDBRemoteConnection };
