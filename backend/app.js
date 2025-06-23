const express = require('express');
const cors = require('cors');
const app = express();
const klinikRoutes = require('./routes/klinikRoutes');
const coprasRoutes = require('./routes/coprasRoutes');
const authRoutes = require('./routes/authRoutes');
const kriteriaRoutes = require('./routes/kriteriaRoutes');
const kriteriaPilihanRoutes = require('./routes/kriteriaPilihanRoutes');





app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`, req.body);
  next();
});

app.use('/api/klinik', klinikRoutes);
app.use('/api/copras', coprasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/kriteria', kriteriaRoutes);
app.use('/api/kriteria_pilihan', kriteriaPilihanRoutes);

app.use(express.static('public'));



// Error handler global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
