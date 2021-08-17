/**
 * @class
 * @classdesc Error response class to be used over the app.
 */
class ErrorResponse extends Error {
  /**
   * Create an error response.
   * @param {string} message - The error message.
   * @param {number} status - The error code.
   * @param {string} stack - The error stack.
   */
  constructor(message, stack = 'Not Specified') {
    super(message);

    if (message.startsWith('wrong')) {
      this.status = 422;
    } else if (message.includes('exists')) {
      this.status = message.includes('not') ? 404 : 409;
    } else if (message.includes('authorized')) {
      this.status = 401;
    } else {
      this.status = 400;
    }
    this.stack = stack;
  }
}

module.exports = { ErrorResponse };
