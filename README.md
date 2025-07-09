# 🏥 DSS-Klinik-Using-Methode-COPRAS

Sistem Pendukung Keputusan (SPK) berbasis web untuk membantu menentukan **klinik terbaik** menggunakan metode **COPRAS (Complex Proportional Assessment)**. Aplikasi ini dirancang dengan **arsitektur dua backend** untuk memisahkan pengelolaan antarmuka dan logika perhitungan SPK.

---

## 🔧 Teknologi yang Digunakan

| Layer         | Teknologi     |
|---------------|----------------|
| Frontend      | Node.js + Express |
| Backend 1     | Node.js         |
| Backend 2     | Python Flask (Metode COPRAS) |
| Container     | Docker, Docker Compose |
| Package Mgmt  | NPM, pip       |

---

## 🚀 Fitur Utama

- 💡 Implementasi metode COPRAS untuk pengambilan keputusan klinik terbaik.
- 📊 Visualisasi hasil ranking dan analisis alternatif.
- 🔌 Integrasi antara Node.js & Python Flask.
- 🐳 Deploy otomatis via Docker Compose.

---

## 🧱 Struktur Proyek

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



