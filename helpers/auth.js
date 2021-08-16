const jwt = require('jsonwebtoken');

/**
 * Helper function to generate JWT token
 * @param {String} payload
 * @param {String} secretKey jwt secret key AES256
 * @returns {String} generated token
 */
const generateToken = (payload, secretKey) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: '7d',
  });
};

module.exports = { generateToken };
