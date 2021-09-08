const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const sshClient = require('ssh2').Client;
const { Logger } = require('../utils/logger');

const logger = new Logger('Db Connection');

const connectionPoolPromise = async (connectionPool) => {
  try {
    if (process.env.NODE_ENV == 'production') {
      const pool = await sshDBRemoteConnection();
      return Promise.resolve(pool);
    }

    return Promise.resolve(connectionPool);
  } catch (err) {
    logger.error(err.message, err);
    return Promise.reject(err);
  }
};

const sshDBRemoteConnection = () => {
  // radius DB
  const radiusDBPassword = String(process.env.RADIUS_DB_MYSQL_PASSWORD).replace(
    '"',
    '',
  );

  // ssh connection
  const sshConf = {
    host: process.env.RADIUS_SSH_HOST,
    port: 22,
    username: process.env.RADIUS_SSH_USER,
    privateKey: fs.readFileSync(
      path.resolve(__dirname, process.env.RADIUS_SSH_PRIVATE_KEY_PATH),
    ),
  };

  const sqlConf = {
    port: 3306,
    user: process.env.RADIUS_DB_MYSQL_USER,
    password: radiusDBPassword,
    database: process.env.RADIUS_DB_MYSQL_DBNAME,
  };

  const ssh = new sshClient();

  return new Promise((resolve, reject) => {
    ssh
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
