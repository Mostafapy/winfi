const { connectionPoolPromise } = require('../helpers/dbConnections');
class DatabaseConnectionFactory {
  constructor() {}

  async init(connectionPool) {
    if (!this.instance) {
      this.instance = await connectionPoolPromise(connectionPool);
    }
    return this.instance;
  }
}

module.exports = { DatabaseConnectionFactory };
