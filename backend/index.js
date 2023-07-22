const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the actual frontend URL (http://localhost:3000 if running locally)
}));

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'npci',
  password: 'Kesava@9494',
  port: 5432, // Default PostgreSQL port
});

// Middleware to parse JSON in request body
app.use(express.json());

// Route to insert user data into the "users" table
app.post('/adduser', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const e_amount = 0.0; // Set e_amount to 0.0 by default

    // Create the "users" table if it does not exist
    await pool.query(
      'CREATE TABLE IF NOT EXISTS users (serial_id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), e_amount NUMERIC)'
    );

    // Insert user data into the "users" table
    const insertQuery = 'INSERT INTO users (name, email, password, e_amount) VALUES ($1, $2, $3, $4)';
    await pool.query(insertQuery, [name, email, password, e_amount]);

    console.log('User data inserted successfully:', req.body);
    res.status(200).send('User data inserted successfully');
  } catch (err) {
    console.error('Error inserting user data:', err);
    res.status(500).send('Error inserting user data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
