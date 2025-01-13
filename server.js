require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Customers endpoint
app.get('/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Customers');
    res.json(result.rows);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send('Server Error');
  }
});

// Use Railway’s dynamically assigned port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

