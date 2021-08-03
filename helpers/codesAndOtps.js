/**
 * Helper function to generate verification codes
 * @returns { String } 5 digits code or OTPS
 */
const generateCodesAndOtps = () =>
  Math.floor(Math.random() * (9 * Math.pow(10, 5))) + Math.pow(10, 5);

module.exports = { generateCodesAndOtps };
