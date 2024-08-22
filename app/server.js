const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Set the public directory for static files
app.use(express.static(path.join(__dirname, "public")));

// connect to db
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Route to serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const tableName = process.env.TABLE_NAME;
app.get(`/${tableName}`, (req, res) => {
  const query = `SELECT * FROM ${tableName}`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Database query failed.");
    }
    res.json(results);
  });
});

// test connection
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
