const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const sshClient = require('ssh2').Client;

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

console.log(process.env.WINFICOC_WINFI_DB_MYSQL_USER);

// Creating connection pool of winficocWinfi DB
const winficocWinfiPool = mysql.createPool({
  host: process.env.WINFICOC_WINFI_DB_MYSQL_HOST,
  user: process.env.WINFICOC_WINFI_DB_MYSQL_USER,
  password: winficocWinfiDBPassword,
  database: process.env.WINFICOC_WINFI_DB_MYSQL_DBNAME,
});

// Create promise from pool WINFI DB connection
const winficocWinfiDBPromisePool = winficocWinfiPool.promise();

// Creating connection pool of radius DB
const radiusPool = mysql.createPool({
  host: process.env.RADIUS_DB_MYSQL_HOST,
  user: process.env.RADIUS_DB_MYSQL_USER,
  password: radiusDBPassword,
  database: process.env.RADIUS_DB_MYSQL_DBNAME,
});

let radiusDBPromisePool;

if (process.env.NODE_ENV == 'production') {
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
  const radiusDBSSHConnection = new Promise((resolve, reject) => {
    ssh
      .on('ready', function () {
        ssh.forwardOut(
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

  // Create promise from pool RADIUS DB connection
  radiusDBPromisePool = radiusDBSSHConnection;
} else {
  radiusDBPromisePool = radiusPool;
}

module.exports = {
  winficocWinfiDBPromisePool,
  radiusDBPromisePool,
};
