from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Konfigurasi database
db = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    database="spk_klinik"
)

@app.route('/api/copras/hasil', methods=['POST'])
def copras():
    try:
        user_input = request.json.get("nilai_user")  # Contoh: [4,3,5,2,4,3]
        if not user_input or len(user_input) != 6:
            return jsonify({"error": "Input user tidak lengkap"}), 400

        cursor = db.cursor()

        # Coba dulu dengan tabel kombinasi_kriteria
        try:
            # Ambil data dari tabel kombinasi_kriteria
            cursor.execute("""
                SELECT kk.klinik_id, kk.kriteria_id, kk.nilai, kk.kombinasi_ke
                FROM kombinasi_kriteria kk
                ORDER BY kk.klinik_id, kk.kombinasi_ke, kk.kriteria_id
            """)
            rows = cursor.fetchall()
            
            if not rows:
                raise Exception("Tidak ada data di tabel kombinasi_kriteria")
                
            print(f"Data kombinasi ditemukan: {len(rows)} baris")
            
        except Exception as e:
            print(f"Error mengakses kombinasi_kriteria: {e}")
            # Fallback ke tabel kriteria_alternatif jika ada error
            cursor.execute("""
                SELECT ka.klinik_id, ka.kriteria_id, ka.nilai
                FROM kriteria_alternatif ka
                ORDER BY ka.klinik_id, ka.kriteria_id
            """)
            rows = cursor.fetchall()
            # Tambahkan kolom kombinasi_ke dengan nilai default
            rows = [(row[0], row[1], row[2], 1) for row in rows]
            print(f"Menggunakan data kriteria_alternatif: {len(rows)} baris")

        # Ambil data nama klinik
        cursor.execute("SELECT id, nama FROM klinik")
        klinik_data = cursor.fetchall()
        klinik_dict = {k[0]: k[1] for k in klinik_data}

        # Ambil data kriteria (bobot dan atribut)
        cursor.execute("SELECT id, bobot, atribut FROM kriteria ORDER BY id")
        kriteria_info = cursor.fetchall()
        weights = np.array([float(k[1]) for k in kriteria_info])
        types = [True if k[2].lower() == 'benefit' else False for k in kriteria_info]

        # Konversi ke DataFrame
        df = pd.DataFrame(rows, columns=["klinik_id", "kriteria_id", "nilai", "kombinasi_ke"])
        
        # Cari kombinasi yang cocok dengan input user
        user_array = np.array(user_input, dtype=float)
        matching_klinik_ids = []
        
        # Group by klinik_id dan kombinasi_ke
        grouped = df.groupby(['klinik_id', 'kombinasi_ke'])
        
        for (klinik_id, kombinasi_ke), group in grouped:
            # Urutkan berdasarkan kriteria_id dan ambil nilai
            group_sorted = group.sort_values('kriteria_id')
            if len(group_sorted) == 6:  # Pastikan ada 6 kriteria
                kombinasi_values = group_sorted['nilai'].values.astype(float)
                
                # Cek apakah cocok dengan input user
                if np.allclose(kombinasi_values, user_array, rtol=1e-9):
                    matching_klinik_ids.append(klinik_id)
                    print(f"Kombinasi cocok ditemukan: Klinik {klinik_id}, Kombinasi {kombinasi_ke}")

        # Buat pivot table untuk perhitungan COPRAS
        # Gunakan kombinasi pertama untuk setiap klinik jika ada multiple kombinasi
        pivot_data = []
        processed_klinik = set()
        
        for (klinik_id, kombinasi_ke), group in grouped:
            if klinik_id not in processed_klinik:
                group_sorted = group.sort_values('kriteria_id')
                if len(group_sorted) == 6:
                    row_data = {'klinik_id': klinik_id}
                    for _, row in group_sorted.iterrows():
                        row_data[f'C{int(row["kriteria_id"])}'] = float(row['nilai'])
                    pivot_data.append(row_data)
                    processed_klinik.add(klinik_id)

        # Buat DataFrame pivot
        if not pivot_data:
            return jsonify({"error": "Tidak ada data klinik yang valid"}), 400
            
        pivot = pd.DataFrame(pivot_data).set_index('klinik_id')
        
        # Pastikan kolom terurut C1, C2, C3, dst
        column_order = [f'C{i}' for i in range(1, 7)]
        pivot = pivot.reindex(columns=column_order)

        # Tambahkan input user ke dataframe
        user_id = 9999
        pivot.loc[user_id] = user_array

        # Konversi ke float
        pivot = pivot.astype(float)

        # Perhitungan COPRAS
        # Normalisasi
        norm = pivot / pivot.sum()
        
        # Weighted normalization
        weighted = norm * weights

        # Hitung S+ dan S-
        col_names = weighted.columns.tolist()
        S_plus = weighted.loc[:, [col for col, is_benefit in zip(col_names, types) if is_benefit]].sum(axis=1)
        S_minus = weighted.loc[:, [col for col, is_benefit in zip(col_names, types) if not is_benefit]].sum(axis=1)

        # Hitung Q
        min_S_minus = S_minus.min()
        sum_S_plus = S_plus.sum()
        n = len(S_plus)
        Q = S_plus + (min_S_minus / S_minus) * (sum_S_plus / n)

        # Buat hasil DataFrame
        result = pd.DataFrame({
            "klinik_id": pivot.index,
            "nama": [klinik_dict.get(i, "Preferensi Anda") for i in pivot.index],
            "S_plus": S_plus.round(4),
            "S_minus": S_minus.round(4),
            "Q": Q.round(4)
        })

        # Prioritaskan klinik yang cocok dengan input user
        if matching_klinik_ids:
            # Pisahkan hasil berdasarkan kecocokan
            terpilih = result[result["klinik_id"].isin(matching_klinik_ids)]
            lainnya = result[~result["klinik_id"].isin(matching_klinik_ids)]
            
            # Gabungkan dengan urutan: yang cocok dulu (diurutkan Q desc), lalu yang lain
            result = pd.concat([
                terpilih.sort_values(by="Q", ascending=False),
                lainnya.sort_values(by="Q", ascending=False)
            ], ignore_index=True)
        else:
            # Jika tidak ada yang cocok, urutkan berdasarkan Q saja
            result = result.sort_values(by="Q", ascending=False).reset_index(drop=True)

        print(f"Hasil perhitungan untuk {len(result)} alternatif")
        return jsonify(result.to_dict(orient="records"))

    except Exception as e:
        print(f"Error dalam perhitungan COPRAS: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route('/api/copras/pilihan', methods=['GET'])
def get_kriteria_pilihan():
    try:
        cursor = db.cursor()
        cursor.execute("""
            SELECT kp.kriteria_id, k.nama, kp.skor, kp.deskripsi
            FROM kriteria_pilihan kp
            JOIN kriteria k ON kp.kriteria_id = k.id
            ORDER BY kp.kriteria_id, kp.skor DESC
        """)
        rows = cursor.fetchall()

        kriteria_dict = {}
        for kriteria_id, kriteria_nama, skor, deskripsi in rows:
            key = f"C{kriteria_id}"
            if key not in kriteria_dict:
                kriteria_dict[key] = {
                    "kriteria_id": kriteria_id,
                    "nama_kriteria": kriteria_nama,
                    "pilihan": []
                }
            kriteria_dict[key]["pilihan"].append({
                "skor": skor,
                "deskripsi": deskripsi
            })

        return jsonify(list(kriteria_dict.values()))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/copras/kombinasi/<int:klinik_id>', methods=['GET'])
def get_kombinasi_klinik(klinik_id):
    """Endpoint untuk melihat semua kombinasi suatu klinik"""
    try:
        cursor = db.cursor()
        cursor.execute("""
            SELECT kk.kombinasi_ke, kk.kriteria_id, kk.nilai, k.nama as nama_kriteria
            FROM kombinasi_kriteria kk
            JOIN kriteria k ON kk.kriteria_id = k.id
            WHERE kk.klinik_id = %s
            ORDER BY kk.kombinasi_ke, kk.kriteria_id
        """, (klinik_id,))
        rows = cursor.fetchall()

        kombinasi_dict = {}
        for kombinasi_ke, kriteria_id, nilai, nama_kriteria in rows:
            if kombinasi_ke not in kombinasi_dict:
                kombinasi_dict[kombinasi_ke] = {
                    "kombinasi_ke": kombinasi_ke,
                    "klinik_id": klinik_id,
                    "kriteria": []
                }
            kombinasi_dict[kombinasi_ke]["kriteria"].append({
                "kriteria_id": kriteria_id,
                "nama_kriteria": nama_kriteria,
                "nilai": nilai
            })

        return jsonify(list(kombinasi_dict.values()))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/test', methods=['GET'])
def test_connection():
    """Endpoint untuk test koneksi database"""
    try:
        cursor = db.cursor()
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        return jsonify({"status": "OK", "test_result": result[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)