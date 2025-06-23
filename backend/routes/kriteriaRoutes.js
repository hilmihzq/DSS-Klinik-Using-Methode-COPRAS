const express = require('express');
const router = express.Router();
const db = require('../db');  // koneksi database mysql2

// GET semua kriteria
router.get('/', (req, res) => {
  db.query('SELECT * FROM kriteria', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal mengambil data kriteria' });
    }
    res.json(results);
  });
});

// PUT update kriteria by id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nama, bobot, tipe } = req.body;

  if (!nama || !tipe || bobot == null) {
    return res.status(400).json({ error: 'Data tidak lengkap' });
  }

  const sql = 'UPDATE kriteria SET nama = ?, bobot = ?, tipe = ? WHERE id = ?';
  db.query(sql, [nama, bobot, tipe, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal memperbarui data kriteria' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Kriteria tidak ditemukan' });
    }
    res.json({ message: 'Data kriteria berhasil diperbarui' });
  });
});

module.exports = router;
