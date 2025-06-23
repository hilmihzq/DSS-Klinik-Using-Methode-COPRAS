// backend/routes/coprasRoutes.js
const express = require('express');
const router = express.Router();
const { hitungCopras } = require('../controllers/coprasController');  // destructuring import

router.post('/hasil', hitungCopras); // <--- Ini akan sukses jika hitungCopras adalah fungsi

module.exports = router;
