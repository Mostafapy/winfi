const generateMacAddress = () =>
  'XX:XX:XX:XX:XX:XX'.replace(/X/g, () => {
    return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
  });

module.exports = { generateMacAddress };
