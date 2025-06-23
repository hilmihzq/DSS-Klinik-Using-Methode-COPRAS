const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',           // kosongkan jika kamu tidak atur password di XAMPP
  database: 'spk_klinik'  // pastikan sesuai nama database kamu
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Koneksi database gagal:', err.message);
  } else {
    console.log('✅ Terhubung ke database MySQL');
  }
});

module.exports = connection;
