const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const Tunnel = require('tunnel-ssh');
const { Logger } = require('../utils/logger');
const logger = new Logger('DbConnection');

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
  const radiusDBPassword = String(process.env.RADIUS_DB_MYSQL_PASSWORD).replace(
    '"',
    '',
  );

  return new Promise((resolve, reject) => {
    const tunnelPort = 33000 + Math.floor(Math.random() * 1000);

    Tunnel(
      {
        //First connect to this server over ssh
        host: process.env.RADIUS_SSH_HOST,
        username: process.env.RADIUS_SSH_USER,
        port: 22,
        privateKey: fs.readFileSync(
          path.resolve(__dirname, process.env.RADIUS_SSH_PRIVATE_KEY_PATH),
        ),

        /**
         * And forward the inner dstPort (on which mysql is running)
         * to the host (where your app is running) with a random port
         */
        dstPort: 3306,
        localPort: tunnelPort,
      },
      (err) => {
        if (err) reject(err);
        logger.log('Tunnel connected');

        /**
         * Now that the tunnel is running,
         * it is forwarding our above "dstPort" to localhost/tunnelPort
         * and we connect to our mysql instance.
         */

        const sqlConf = {
          port: tunnelPort,
          user: process.env.RADIUS_DB_MYSQL_USER,
          password: radiusDBPassword,
          database: process.env.RADIUS_DB_MYSQL_DBNAME,
        };

        const connection = mysql.createConnection(sqlConf).promise();

        connection.on('error', (err) => {
          reject(err);
        });
        connection.connect((err) => {
          if (err) reject(err);
          logger.log('Mysql connected as id ' + connection.threadId);

          resolve(connection);
        });
      },
    );
  });
};

module.exports = { connectionPoolPromise, sshDBRemoteConnection };
