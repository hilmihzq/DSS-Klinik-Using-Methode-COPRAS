const express = require('express');
const router = express.Router();
const db = require('../db'); // import koneksi database

// GET semua data kriteria pilihan
router.get('/', (req, res) => {
  const query = 'SELECT * FROM kriteria_pilihan';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Gagal mengambil data' });
    res.json(results);
  });
});

// PUT update data berdasarkan id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { kriteria_id, skor, deskripsi } = req.body;
  if (!kriteria_id || !skor || !deskripsi) {
    return res.status(400).json({ error: 'Semua field harus diisi' });
  }

  const query = 'UPDATE kriteria_pilihan SET kriteria_id = ?, skor = ?, deskripsi = ? WHERE id = ?';
  db.query(query, [kriteria_id, skor, deskripsi, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Gagal memperbarui data' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Data tidak ditemukan' });

    db.query('SELECT * FROM kriteria_pilihan WHERE id = ?', [id], (err2, rows) => {
      if (err2) return res.status(500).json({ error: 'Gagal mengambil data terbaru' });
      res.json(rows[0]);
    });
  });
});

// DELETE hapus data berdasarkan id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'DELETE FROM kriteria_pilihan WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Gagal menghapus data' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Data tidak ditemukan' });
    res.json({ message: 'Data berhasil dihapus' });
  });
});

module.exports = router;
