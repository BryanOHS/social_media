import { Pool } from 'pg';

// Create a new pool instance with your database configuration
const pool = new Pool({
  user: process.env.DB_USER,        // Your database username
  host: process.env.DB_HOST,        // Your database host (e.g., localhost)
  database: process.env.DB_NAME,    // Your database name
  password: process.env.DB_PASSWORD, // Your database password
  port: Number(process.env.DB_PORT)  // Your database port (e.g., 5432 for PostgreSQL)
});

// Create a function to execute queries
const query = async (text: string, params?: any[]) => {
  try {
    const res = await pool.query(text, params);
    return res.rows; // or res.rows if you want the rows only
  } catch (err) {
    console.error('Database query error:', err);
    throw err; // Rethrow the error after logging it
  }
};
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    client.release();
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

testConnection();
// Export the query function and pool instance for use in other parts of your application
export { query, pool };
