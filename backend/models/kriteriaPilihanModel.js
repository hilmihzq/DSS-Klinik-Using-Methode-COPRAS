// models/kriteriaPilihanModel.js
const connection = require('../db');

function getAllAlternatif(callback) {
  const sql = 'SELECT * FROM kriteria_pilihan ORDER BY kriteria_id, skor DESC';
  connection.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}

function getAlternatifById(id, callback) {
  const sql = 'SELECT * FROM kriteria_pilihan WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
}

function updateAlternatif(id, data, callback) {
  const { kriteria_id, skor, deskripsi } = data;
  const sql = 'UPDATE kriteria_pilihan SET kriteria_id = ?, skor = ?, deskripsi = ? WHERE id = ?';
  connection.query(sql, [kriteria_id, skor, deskripsi, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}

function deleteAlternatif(id, callback) {
  const sql = 'DELETE FROM kriteria_pilihan WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}

module.exports = {
  getAllAlternatif,
  getAlternatifById,
  updateAlternatif,
  deleteAlternatif,
};
