# 🔍 ForensicAI Audit

> **Deteksi dini manipulasi laporan keuangan dan anomali akuntansi emiten IHSG secara instan.**  
> Menggabungkan data fundamental **Sectors Financial API** dengan model akuntansi forensik dan penalaran mendalam **Google Gemini AI**.

---

## 💡 Masalah yang Diselesaikan

Banyak investor retail dan analis sering terjebak oleh **laba bersih yang terlihat kinclong di atas kertas**, padahal perusahaan aslinya sedang sekarat secara kas. Praktik manipulasi laba (*window dressing*), penundaan pengakuan beban, hingga penggelembungan piutang sangat sulit dideteksi hanya dengan melihat rasio P/E atau PBV standar.

Membaca dan membedah ratusan halaman catatan laporan keuangan (CALK) membutuhkan waktu berjam-jam dan keahlian akuntansi khusus.

**ForensicAI Audit** hadir untuk menyelesaikan masalah ini: cukup ketik kode saham (ticker), sistem kami otomatis membongkar integritas laporan keuangan emiten dalam hitungan detik.

---

## ⚡ Fitur Utama

### 1. Deteksi Red Flags Otomatis (Forensic Detectors)
Sistem memindai hingga 12 kuartal laporan keuangan historis menggunakan formula forensik teruji:
* **Earnings vs Cash Flow Divergence (Beneish-style):** Mendeteksi apakah laba bersih naik tajam namun arus kas operasi (OCF) justru jeblok atau negatif.
* **Sloan Accrual Ratio:** Mengukur seberapa besar laba yang berasal dari akrual non-kas vs uang riil. Rasio tinggi = sinyal bahaya laba dipoles.
* **Days Sales Outstanding (DSO) & Anomali Piutang:** Memeriksa apakah kenaikan penjualan hanya penumpukan piutang macet yang belum tertagih.
* **Debt & Solvency Distress:** Memantau lonjakan utang berbunga relatif terhadap kemampuan kas operasional emiten.
* **Cash Burn & Free Cash Flow Leakage:** Memetakan kesehatan arus kas bebas untuk melihat daya tahan operasional emiten.

### 2. AI Forensic Auditor (Powered by Gemini AI)
Bukan sekadar angka, AI kami bertindak seperti auditor forensik independen:
* Menghasilkan **Opini Audit Eksekutif** otomatis (layaknya audit review independen).
* Memberikan penjelasan detail atas temuan *Red Flag* yang kritis.
* Menyarankan langkah kewaspadaan (*actionable advice*) khusus bagi investor retail.

### 3. Stress Test Simulator
Uji ketahanan fundamental emiten secara interaktif:
* Simulasi penurunan omzet (Revenue shock).
* Simulasi tekanan arus kas dan kontraksi margin.
* Mengetahui apakah emiten masih sanggup bertahan atau berisiko gagal bayar utang.

### 4. Perbandingan Emiten & Multi-Language Support
* Bandingkan skor risiko forensik antar-kompetitor dalam satu sektor secara *head-to-head*.
* Tersedia penuh dalam Bahasa Indonesia dan English.

---

## 🛠️ Arsitektur & Teknologi

* **Frontend & Framework:** Next.js 16 (App Router), React 19, TypeScript
* **Styling:** Tailwind CSS v4 (Desain modern bergaya terminal audit finansial)
* **Visualisasi Data:** Recharts & Lucide React
* **Data Keuangan:** [Sectors Financial API](https://sectors.app) (Quarterly financials, annual balance sheet, cash flows, and company overviews)
* **Mesin AI:** Google Gemini 2.5 Flash via `@google/generative-ai`

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

### 1. Clone repositori
```bash
git clone https://github.com/natasyasilalahi/forensicai-audit.git
cd forensicai-audit
```

### 2. Install dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env.local` di folder root, lalu isi dengan API key Anda:
```env
# Sectors Financial API Key (https://sectors.app/api)
SECTORS_API_KEY=masukkan_sectors_api_key_anda

# Google Gemini API Key (https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=masukkan_gemini_api_key_anda
```

### 4. Jalankan aplikasi
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## 📌 Disclaimer
ForensicAI Audit dirancang sebagai alat bantu riset, edukasi, dan audit awal integritas laporan keuangan. Hasil analisis dan skor risiko bukan merupakan rekomendasi jual/beli investasi secara langsung.
