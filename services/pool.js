const { Pool } = require('pg');

// Configure PostgreSQL through standard environment variables.
// Never commit real database credentials to source control.
const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE || 'cogwheel_db',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD,
});

module.exports = pool;
