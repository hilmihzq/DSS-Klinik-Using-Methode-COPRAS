// dbPromise.js
const mysql = require('mysql2/promise');

let connection;

async function getDB() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'spk_klinik'
    });
    console.log('✅ Terhubung ke database MySQL');
  }
  return connection;
}

module.exports = getDB;
