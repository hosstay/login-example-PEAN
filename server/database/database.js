const {Client} = require('pg');

const util = require('../utility/utility');

class Database {
  constructor() {
    this.clientConfig = {
      user: 'dbuser',
      host: 'localhost',
      database: 'test-website',
      password: 'dbuser',
      port: '5432'
    };

    this.client;
  }

  async query(query) {
    try {
      this.client = new Client(this.clientConfig);

      await this.client.connect();

      let results = await this.client.query(query);
      results = results.length ? results[results.length - 1].rows : results.rows;

      await this.client.end();

      return results;
    } catch (err) {
      util.errorHandler({err: err, context: 'query'});
    }
  }

  async paramQuery(query, values) {
    try {
      this.client = new Client(this.clientConfig);

      await this.client.connect();

      let results = await this.client.query(query, values);
      results = results.length ? results[results.length - 1].rows : results.rows;

      await this.client.end();

      return results;
    } catch (err) {
      util.errorHandler({err: err, context: 'paramQuery'});
    }
  }
}

module.exports = Database;