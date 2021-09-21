const { connectionPoolPromise } = require('../helpers/dbConnections');
class DatabaseConnectionFactory {
  constructor() {}

  static async build(connectionPool) {
    if (!this.instance) {
      this.instance = await connectionPoolPromise(connectionPool);
    }
    return this.instance;
  }
}

module.exports = { DatabaseConnectionFactory };
