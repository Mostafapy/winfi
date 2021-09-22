const mysql = require('mysql2');

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
  port: process.env.WINFICOC_WINFI_DB_MYSQL_PORT,
});

// Create promise from pool WINFI DB connection
const winficocWinfiDBPromisePool = winficocWinfiPool.promise();

// Creating connection pool of radius DB
const radiusDBPool = mysql.createPool({
  host: process.env.RADIUS_DB_MYSQL_HOST,
  user: process.env.RADIUS_DB_MYSQL_USER,
  password: radiusDBPassword,
  database: process.env.RADIUS_DB_MYSQL_DBNAME,
});

const radiusDBPromisePool = radiusDBPool.promise();

module.exports = {
  winficocWinfiDBPromisePool,
  radiusDBPromisePool,
};
