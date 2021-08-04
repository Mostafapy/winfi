/**
 * validate email correct format
 * @param {String} email
 * @returns { true | false}
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
};

/**
 * validate mobile phone number
 * @param {string} mobile
 * @param {string} countryCode
 * @returns { true | false }
 */
const validateMobile = (mobile, countryCode) => {
  if (!mobile.startsWith(countryCode)) {
    return false;
  }

  return true;
};
module.exports = {
  validateEmail,
  validateMobile,
};
