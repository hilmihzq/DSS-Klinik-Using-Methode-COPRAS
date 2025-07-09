# 🏥 DSS-Klinik-Using-Methode-COPRAS

Sistem Pendukung Keputusan (SPK) **berbasis web** yang dirancang untuk membantu menentukan **klinik terbaik** dengan menggunakan metode **COPRAS (Complex Proportional Assessment)**.

🔗 Proyek ini menggabungkan dua backend sekaligus yaitu **Node.js** dan **Python Flask** dalam satu sistem terintegrasi yang cerdas dan fleksibel. Sangat cocok untuk kamu yang tertarik di bidang **AI, Data Decision Making, dan Web Development**.

---

## 🚀 Fitur Unggulan

- 💡 **Implementasi metode COPRAS** untuk mendukung keputusan klinik secara objektif.
- 🧠 **Arsitektur dua backend** (Node.js & Python Flask) yang efisien dan scalable.
- 📊 **Hasil ranking otomatis** dari input data klinik dan kriteria.
- 🔌 **Integrasi API antar teknologi** dengan komunikasi JSON.
- 🐳 **Mudah dijalankan dengan Docker Compose** hanya dalam satu perintah.
- 📱 Siap dikembangkan lebih lanjut dengan UI modern berbasis React atau Vue (opsional).

---

## 🧰 Teknologi yang Digunakan

| Layer         | Teknologi                |
|---------------|--------------------------|
| Frontend      | Node.js + Express        |
| Backend 1     | Node.js                  |
| Backend 2     | Python Flask (COPRAS)    |
| Container     | Docker, Docker Compose   |
| Package Mgmt  | NPM, pip                 |

---

## 📁 Struktur Proyek

```text
spk-klinik-copras/
├── backend-node/
│   ├── index.js                       # Entry point aplikasi Node.js
│   ├── routes/
│   │   └── coprasRoutes.js           # Routing API
│   ├── controllers/
│   │   └── coprasController.js       # Logika pemrosesan & integrasi ke Flask
│   ├── models/                       # (Kosong, untuk skema data jika diperlukan)
│   └── utils/                        # (Kosong, untuk helper atau konfigurasi)
│
├── backend-flask/
│   ├── app.py                        # Entry point Flask
│   ├── copras.py                     # Logika perhitungan COPRAS
│   └── requirements.txt              # Dependensi Flask
│
├── docker-compose.yml               # Orkestrasi layanan dengan Docker (opsional)
└── README.md                        # Dokumentasi proyek
