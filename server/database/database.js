const {Pool} = require('pg');

const util = require('../utility/utility');

class Database {
  constructor() {
    this.poolConfig = {
      host: 'db',
      user: 'docker',
      database: 'docker',
      password: 'docker',
      port: '5432',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    };

    this.pool;
  }

  async init() {
    try {
      this.pool = new Pool(this.poolConfig);

      await this.query('CREATE TABLE IF NOT EXISTS users (id serial, username varchar(40), password varchar(200))');
    } catch (err) {
      util.errorHandler({err: err, context: 'init'});
    }
  }

  async teardown() {
    try {
      this.pool.end();
    } catch (err) {
      util.errorHandler({err: err, context: 'teardown'});
    }
  }

  async query(query) {
    try {
      const client = await this.pool.connect();

      let results = await client.query(query);
      results = results.length ? results[results.length - 1].rows : results.rows;

      client.release();

      return results;
    } catch (err) {
      util.errorHandler({err: err, context: 'query'});
    }
  }

  async paramQuery(query, values) {
    try {
      const client = await this.pool.connect();

      let results = await client.query(query, values);
      results = results.length ? results[results.length - 1].rows : results.rows;

      client.release();

      return results;
    } catch (err) {
      util.errorHandler({err: err, context: 'paramQuery'});
    }
  }
}

module.exports = Database;