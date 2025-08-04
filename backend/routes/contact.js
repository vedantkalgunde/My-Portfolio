const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("Message received successfully!");
  });
});

module.exports = router;
