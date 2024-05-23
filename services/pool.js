const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cogwheel_db',
  password: 'asdf',
  port: 5432,
});

module.exports = pool;
