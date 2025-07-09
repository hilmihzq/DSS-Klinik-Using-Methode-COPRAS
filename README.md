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

## 🧰 Tampilan Antarmuka

Bisa melihat Projek ini dengan akses link gdrive berikut(https://drive.google.com/drive/folders/1y20oAdkilh4GhcvL9uZyByPSLnPUOY_N?usp=sharing) berupa image
Kalian juga bisa akses prototype video berikut (https://drive.google.com/file/d/1gB6HvjlEyAxNacd57N0v3yxE6RBk_cxr/view?usp=sharing)


<p align="center"> <img src="https://github.com/user-attachments/assets/2f61d517-3ecc-4e79-8385-a217dab91aa9" width="35%"/> <img src="https://github.com/user-attachments/assets/12bdee4a-1796-4dbb-a7a9-0b30b9de0ddb" width="35%"/> <img src="https://github.com/user-attachments/assets/9422062e-33f7-4352-8da1-a498019bd1cc" width="35%"/> <img src="https://github.com/user-attachments/assets/74738df2-3da8-47bc-ba2c-6f6e0f024e47" width="35%"/> <img src="https://github.com/user-attachments/assets/42f2e589-a2eb-40a7-ad7a-aa93f8bae2d0" width="35%"/> <img src="https://github.com/user-attachments/assets/59f14220-ca24-4b88-b9d2-e25e40239436" width="35%"/> <img src="https://github.com/user-attachments/assets/c6d23ccb-d716-4607-8fd7-e36aefa26e13" width="35%"/> <img src="https://github.com/user-attachments/assets/f7091eea-4f14-4d41-a873-e75bee9249f7" width="35%"/> <img src="https://github.com/user-attachments/assets/7f8e3120-ebee-48ac-b5ea-549bb97c4443" width="35%"/> <img src="https://github.com/user-attachments/assets/0a7b9409-4d92-4898-9bf7-c7631d2b3a28" width="35%"/> <img src="https://github.com/user-attachments/assets/8da42a3b-0594-4a5d-aa95-f937ba12abe0" width="35%"/> <img src="https://github.com/user-attachments/assets/df83f98b-1fad-4e60-a17e-a4082137e285" width="35%"/> <img src="https://github.com/user-attachments/assets/e333bbc4-0ebd-4b65-b70c-e2a76962b185" width="35%"/> <img src="https://github.com/user-attachments/assets/87a076a5-11c0-40f0-ad27-462d9cb29656" width="35%"/> <img src="https://github.com/user-attachments/assets/65186c8a-a05f-40ed-9165-9f90b1f51064" width="35%"/> <img src="https://github.com/user-attachments/assets/d3873a83-8dc7-4dcd-b2a1-eb336a57d57f" width="35%"/> <img src="https://github.com/user-attachments/assets/14fe11a0-afe7-4f68-80b4-4f46d2d235de" width="35%"/> <img src="https://github.com/user-attachments/assets/89a5531e-5590-448c-9012-a35c060bee79" width="35%"/> <img src="https://github.com/user-attachments/assets/b809a0a8-7202-43d9-b079-e9c7d213a58f" width="35%"/> <img src="https://github.com/user-attachments/assets/9478a9ae-d224-4ddf-922b-d40e43041a1d" width="35%"/> </p>
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
