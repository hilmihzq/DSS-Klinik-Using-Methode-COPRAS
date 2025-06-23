const express = require('express');
const router = express.Router();
const db = require('../db');

// === SIGNUP ADMIN ===
router.post('/signup', (req, res) => {
  const { fullname, email, password } = req.body;

  db.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'Email sudah terdaftar' });
    }

    db.query('INSERT INTO admin (fullname, email, password) VALUES (?, ?, ?)', [fullname, email, password], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ success: true, message: 'Akun berhasil dibuat' });
    });
  });
});


// === LOGIN ADMIN ===
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      res.json({ success: true, message: 'Login berhasil' });
    } else {
      res.status(401).json({ success: false, message: 'Email atau password salah' });
    }
  });
});


module.exports = router;
