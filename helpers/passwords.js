const crypto = require('crypto');

/**
 * Helper function to hash password using MD5
 * @param {String} password
 * @returns { String } Hashed password
 */
const md5HashPassword = (password) =>
  crypto.createHash('md5').update(password).digest('hex');

/**
 * Helper function to random password using MD5
 * @param {number} passwordLength
 * @returns { String } generated password
 */
const generateNewPassword = (passwordLength) => {
  var numberChars = '0123456789';
  var upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  var allChars = numberChars + upperChars + lowerChars;
  var randPasswordArray = Array(passwordLength);
  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray = randPasswordArray.fill(allChars, 3);
  return shuffleArray(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    }),
  ).join('');
};

const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

module.exports = { md5HashPassword, generateNewPassword };
