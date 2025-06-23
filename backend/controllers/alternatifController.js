const db = require('../db');

// GET semua alternatif + skor
exports.getAllAlternatif = (req, res) => {
    const sql = `
        SELECT a.*, s.c1, s.c2, s.c3, s.c4, s.c5, s.c6
        FROM alternatif a
        LEFT JOIN skor_alternatif s ON a.id = s.alternatif_id
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// POST buat alternatif baru + skor
exports.createAlternatif = (req, res) => {
    const { nama_klinik, deskripsi, c1, c2, c3, c4, c5, c6 } = req.body;
    const sql1 = `INSERT INTO alternatif (nama_klinik, deskripsi) VALUES (?, ?)`;
    db.query(sql1, [nama_klinik, deskripsi], (err, result) => {
        if (err) return res.status(500).send(err);
        const alternatif_id = result.insertId;
        const sql2 = `
            INSERT INTO skor_alternatif (alternatif_id, c1, c2, c3, c4, c5, c6)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(sql2, [alternatif_id, c1, c2, c3, c4, c5, c6], (err2) => {
            if (err2) return res.status(500).send(err2);
            res.send({ message: 'Alternatif berhasil ditambahkan' });
        });
    });
};

// PUT edit alternatif + skor
exports.updateAlternatif = (req, res) => {
    const { id } = req.params;
    const { nama_klinik, deskripsi, c1, c2, c3, c4, c5, c6 } = req.body;
    const sql1 = `UPDATE alternatif SET nama_klinik=?, deskripsi=? WHERE id=?`;
    db.query(sql1, [nama_klinik, deskripsi, id], (err) => {
        if (err) return res.status(500).send(err);
        const sql2 = `
            UPDATE skor_alternatif SET c1=?, c2=?, c3=?, c4=?, c5=?, c6=?
            WHERE alternatif_id=?
        `;
        db.query(sql2, [c1, c2, c3, c4, c5, c6, id], (err2) => {
            if (err2) return res.status(500).send(err2);
            res.send({ message: 'Alternatif berhasil diperbarui' });
        });
    });
};

// DELETE alternatif
exports.deleteAlternatif = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM alternatif WHERE id=?`;
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Alternatif berhasil dihapus' });
    });
};
