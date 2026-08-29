const { Pool } = require('pg');
const { databaseUrl, nodeEnv } = require('./config');

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: nodeEnv === 'production' ? { rejectUnauthorized: false } : undefined
});

module.exports = pool;
