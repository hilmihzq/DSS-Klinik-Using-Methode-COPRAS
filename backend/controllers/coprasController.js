const axios = require('axios');

exports.hitungCopras = async (req, res) => {
    try {
        const data = req.body;

        const response = await axios.post('http://localhost:5000/api/hitung-copras', data);

        return res.json(response.data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gagal hitung COPRAS dari Python' });
    }
};
