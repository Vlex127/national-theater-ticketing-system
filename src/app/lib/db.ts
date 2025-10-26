// src/app/lib/db.ts
import { Pool } from '@neondatabase/serverless';

console.log('Database URL:', process.env.DATABASE_URL ? 'Found' : 'Not found');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the connection
pool.query('SELECT NOW()')
  .then(res => console.log('Database connected successfully at:', res.rows[0].now))
  .catch(err => console.error('Database connection error:', err));

export default pool;