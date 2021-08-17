const mysql = require('mysql2');
const { Client } = require('ssh2');

// remove " char from password e.g. "pass" => pass
// winficocWinfi DB
const winficocWinfiDBPassword = String(
  process.env.WINFICOC_WINFI_DB_MYSQL_PASSWORD,
).replace('"', '');

// radius DB
const radiusDBPassword = String(process.env.RADIUS_DB_MYSQL_PASSWORD).replace(
  '"',
  '',
);

// Creating connection pool of winficocWinfi DB
const winficocWinfiPool = mysql.createPool({
  host: process.env.WINFICOC_WINFI_DB_MYSQL_HOST,
  user: process.env.WINFICOC_WINFI_DB_MYSQL_USER,
  password: winficocWinfiDBPassword,
  database: process.env.WINFICOC_WINFI_DB_MYSQL_DBNAME,
});

// Creating connection pool of radius DB
const radiusPool = mysql.createPool({
  host: process.env.RADIUS_DB_MYSQL_HOST,
  user: process.env.RADIUS_DB_MYSQL_USER,
  password: radiusDBPassword,
  database: process.env.RADIUS_DB_MYSQL_DBNAME,
});

// Create promise from pool WINFI DB connection
const winficocWinfiDBPromisePool = winficocWinfiPool.promise();

// Create promise from pool RADIUS DB connection
let radiusDBPromisePool;

if (process.env.NODE_ENV == 'production') {
  // SSH Connection for production

  // create an instance of SSH Client
  const sshClient = new Client();

  const dbServer = {
    host: process.env.RADIUS_DB_MYSQL_HOST,
    port: 3306,
    user: process.env.RADIUS_DB_MYSQL_USER,
    password: process.env.RADIUS_DB_MYSQL_PASSWORD,
    database: process.env.RADIUS_DB_MYSQL_DBNAME,
  };
  const tunnelConfig = {
    host: process.env.RADIUS_SSH_HOST,
    port: 22,
    username: process.env.RADIUS_SSH_USER,
    privateKey: Buffer.from(process.env.RADIUS_SSH_PRIVATE_KEY, 'utf-8'),
  };
  const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port,
  };
  const radiusDBSSHConnection = new Promise((resolve, reject) => {
    sshClient
      .on('ready', () => {
        sshClient.forwardOut(
          forwardConfig.srcHost,
          forwardConfig.srcPort,
          forwardConfig.dstHost,
          forwardConfig.dstPort,
          (err, stream) => {
            if (err) reject(err);
            const updatedDbServer = {
              ...dbServer,
              stream,
            };
            const connection = mysql.createConnection(updatedDbServer);
            connection.connect((error) => {
              if (error) {
                reject(error);
              }
              resolve(connection);
            });
          },
        );
      })
      .connect(tunnelConfig);
  });
  radiusDBPromisePool = radiusDBSSHConnection;
} else {
  radiusDBPromisePool = radiusPool.promise();
}
module.exports = {
  winficocWinfiDBPromisePool,
  radiusDBPromisePool,
};
