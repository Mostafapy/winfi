/**
 * Helper function to generate new MAC address eg. CC:46:D6:CC:46:D6
 * @returns { String } The new MAC address
 */
const generateMacAddress = () =>
  'XX:XX:XX:XX:XX:XX'.replace(/X/g, () => {
    return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
  });

module.exports = { generateMacAddress };
