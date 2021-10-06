/**
 * Helper function to generate verification codes
 * @returns { String } 6 digits code or OTPS
 */
const generateCodesAndOtps = () =>
  Math.floor(
    Math.pow(10, 5) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 5) - 1),
  );

module.exports = { generateCodesAndOtps };
