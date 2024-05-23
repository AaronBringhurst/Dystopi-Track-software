const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cogwheel_db',
  password: 'asdf',  // Use your actual password
  port: 5432,
});

module.exports = pool;
