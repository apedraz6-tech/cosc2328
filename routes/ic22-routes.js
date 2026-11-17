// IC22 – COSC 2328 – Professor McCurry
// Implemented by: [Student Full Name]

const express = require('express');
const router  = express.Router();
const db      = require('../db');
router.get('/students', (req, res) => {
  db.all('SELECT * FROM students ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// routes go here

module.exports = router;