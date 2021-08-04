const mysql = require('mysql2');

// remove " char from password e.g. "pass" => pass
// winficocWinfi DB
const winficocWinfiDBPassword = String(
  process.env.WINFICOC_WINFI_DB_MYSQL_PASSWORD,
).replace('"', '');

// radius DB
const radiusDBPassword = String(process.env.Radius_DB_MYSQL_PASSWORD).replace(
  '"',
  '',
);

// Creating connection pool of winficocWinfi DB
const winficocWinfiPool = mysql.createPool({
  host: process.env.WINFICOC_WINFI_DB_MYSQL_HOST,
  user: process.env.WINFICOC_WINFI_DB_MYSQL_USER,
  password: winficocWinfiDBPassword,
  database: process.env.WINFICOC_WINFI_DB_MYSQL_DBNAME,
  waitForConnections: true,
});

// Creating connection pool of radius DB
const radiusPool = mysql.createPool({
  host: process.env.RADIUS_DB_MYSQL_HOST,
  user: process.env.RADIUS_DB_MYSQL_USER,
  password: radiusDBPassword,
  database: process.env.RADIUS_DB_MYSQL_DBNAME,
  waitForConnections: true,
});

// Create promise from pool connection
const winficocWinfiDBPromisePool = winficocWinfiPool.promise();

const radiusDBPromisePool = radiusPool.promise();

module.exports = {
  winficocWinfiDBPromisePool,
  radiusDBPromisePool,
};
