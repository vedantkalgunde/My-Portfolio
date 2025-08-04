// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors()); // Allow all origins (you can limit this in production)
app.use(express.json()); // Parse JSON bodies

// MySQL DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "portfolio_db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// POST /api/contact
app.post("/api/contact_form", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  const sql = "INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("❌ Error inserting data:", err.message);
      return res.status(500).json({ error: "Database insert error." });
    }

    res.status(200).json({ message: "Message submitted successfully." });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
