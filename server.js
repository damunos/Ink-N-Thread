require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 8080;

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

// Healthcheck route
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy!');
});

// API endpoint
app.get('/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Customers');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching customers:', err.message);
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
