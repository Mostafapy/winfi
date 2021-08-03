const crypto = require('crypto');

/**
 * Helper function to hash password using MD5
 * @param {String} password
 * @returns { String } Hashed password
 */
const md5HashPassword = (password) =>
  crypto.createHash('md5').update(password).digest('hex');

module.exports = { md5HashPassword };
