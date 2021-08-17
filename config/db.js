const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const sshClient = require('ssh2').Client;
const { sshDBRemoteConnection } = require('../helpers/dbConnections');

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
let winficocWinfiDBPromisePool;
let radiusDBPromisePool;

if (process.env.NODE_ENV == 'production') {
  // winficoc DB ssh connection
  const winficocWinfiDBsshConf = {
    host: process.env.WINFICOC_WINFI_SSH_HOST,
    port: 22,
    username: process.env.WINFICOC_WINFI_SSH_USER,
    password: String(process.env.WINFICOC_WINFI_SSH_PASSWORD).replace('"', ''),
  };

  const winficocWinfiDBsqlConf = {
    port: 3306,
    user: process.env.WINFICOC_WINFI_DB_MYSQL_USER,
    password: winficocWinfiDBPassword,
    database: process.env.WINFICOC_WINFI_DB_MYSQL_DBNAME,
  };

  const winficocWinfisshClient = new sshClient();

  const winficocWinfiDBSSHConnection = sshDBRemoteConnection(
    winficocWinfiDBsshConf,
    winficocWinfiDBsqlConf,
    winficocWinfisshClient,
  );

  // radius DB ssh connection
  const radiusDBsshConf = {
    host: process.env.RADIUS_SSH_HOST,
    port: 22,
    username: process.env.RADIUS_SSH_USER,
    privateKey: fs.readFileSync(
      path.resolve(__dirname, process.env.RADIUS_SSH_PRIVATE_KEY_PATH),
    ),
  };

  const radiusDBsqlConf = {
    port: 3306,
    user: process.env.RADIUS_DB_MYSQL_USER,
    password: radiusDBPassword,
    database: process.env.RADIUS_DB_MYSQL_DBNAME,
  };

  const radsshClient = new sshClient();

  const radiusDBSSHConnection = sshDBRemoteConnection(
    radiusDBsshConf,
    radiusDBsqlConf,
    radsshClient,
  );

  // Create promise from pool WINFI DB connection
  winficocWinfiDBPromisePool = winficocWinfiDBSSHConnection;
  // Create promise from pool RADIUS DB connection
  radiusDBPromisePool = radiusDBSSHConnection;
} else {
  // Create promise from pool WINFI DB connection
  winficocWinfiDBPromisePool = winficocWinfiPool.promise();
  // Create promise from pool WINFI DB connection
  radiusDBPromisePool = radiusPool.promise();
}

module.exports = {
  winficocWinfiDBPromisePool,
  radiusDBPromisePool,
};
