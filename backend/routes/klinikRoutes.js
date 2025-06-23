const express = require('express');
const router = express.Router();
const db = require('../db');

// Ambil semua klinik
router.get('/', (req, res) => {
  db.query('SELECT * FROM klinik', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Tambah klinik
// Tambah klinik
router.post('/', (req, res) => {
  console.log('Body diterima:', req.body);  // Debug: cek payload

  let { nama, alamat, telepon, email, jam_operasional, jenis_klinik, deskripsi } = req.body;

  if (!nama || !alamat || !telepon || !email || !jam_operasional || !jenis_klinik) {
    return res.status(400).json({ error: 'Field wajib harus diisi semua' });
  }

  const sql = `
    INSERT INTO klinik (nama, alamat, telepon, email, jam_operasional, jenis_klinik, deskripsi)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [nama, alamat, telepon, email, jam_operasional, jenis_klinik, deskripsi || null];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error Insert:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Klinik berhasil ditambahkan', id: result.insertId });
  });
});



// Ambil semua kriteria
router.get('/kriteria', (req, res) => {
  db.query('SELECT * FROM kriteria', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Tambah penilaian untuk klinik
router.post('/penilaian', (req, res) => {
  const { id_klinik, penilaian } = req.body; // penilaian = [{id_kriteria, nilai}, ...]
  const values = penilaian.map(p => [id_klinik, p.id_kriteria, p.nilai]);

  db.query('DELETE FROM penilaian WHERE id_klinik = ?', [id_klinik], (err) => {
    if (err) return res.status(500).json({ error: err });

    db.query('INSERT INTO penilaian (id_klinik, id_kriteria, nilai) VALUES ?', [values], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ message: 'Penilaian berhasil disimpan' });
    });
  });
});

module.exports = router;
