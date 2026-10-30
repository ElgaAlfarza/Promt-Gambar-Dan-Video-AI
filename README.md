# 🎬 Promt Gambar & Video AI - TikTok & Shorts Co-Pilot

Aplikasi dashboard AI cerdas untuk meriset fakta edukasi, menyusun naskah video pendek (TikTok, Instagram Reels, YouTube Shorts), dan menghasilkan **Prompt Gambar** (DALL-E 3 / Midjourney) serta **Motion Prompt Video** (FLOW / Kling / Luma / Sora / Runway) dengan aspek rasio 9:16 vertikal.

---

## 🌟 Fitur Utama

- **🧠 AI Script & Scene Planner (Google Gemini 3.5 Flash / Pro):**
  - Riset fakta objektif & edukatif berbasis *ground truth*.
  - Penyusunan naskah per scene otomatis (durasi, panduan intonasi suara, caption, dan sumber ilmu).
  - **Dukungan Bahasa Daerah (60% Indonesia : 40% Bahasa Daerah):**
    - **Suku Samawa** (Kamus Basa Samawa & Falsafah *Sabalong Samalewa*).
    - **Suku Bugis** (Kamus Bugis Pesisir Sumbawa & Marwah *Siri' na Pacce* serta *Taro Ada Taro Gau*).
    - **Suku Sasak** (Kamus Base Sasak & Nilai Luhur *Tindih* dan *Patuh Karya*).
    - **Suku Mbojo** (Kearifan Bima-Dompu *Nggahi Rawi Pahu* & *Maja Labo Dahu*).

- **🎨 Prompt Center (Image & Motion AI Ready):**
  - Pemilihan gaya visual karakter lucu & menggemaskan (*Cute Claymation / Stop-Motion*, *3D Stylized Animation*, *Anime Watercolor*, *Cinematic Hyperrealistic*, *Dark Nusantara Folklore*).
  - Format 9:16 vertikal ramah smartphone & anti-filter hak cipta studio pihak ketiga.
  - Sekali klik salin (*Copy*) prompt per-scene atau seluruh prompt.
  - Fitur **Download Semua Prompt (.TXT)** untuk langsung digunakan di AI Generator video pilihan Anda.

---

## 🚀 Panduan Memulai (Quick Start)

### 1. Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas disarankan)

### 2. Instalasi Dependencies
```bash
npm install
```

### 3. Konfigurasi API Key
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Lalu buka file `.env` dan masukkan API Key Gemini Anda:
```env
GEMINI_API_KEY=masukkan_api_key_gemini_anda
VITE_GEMINI_API_KEY=masukkan_api_key_gemini_anda
VITE_GEMINI_MODEL=gemini-3.5-flash
```
*(Dapatkan API Key gratis di [Google AI Studio](https://aistudio.google.com/app/apikey))*.

### 4. Menjalankan Aplikasi
Cukup klik ganda file `JALANKAN_PROJECT.bat` atau jalankan via terminal:
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## 🔒 Keamanan & Privasi
- File `.env` yang memuat kunci API dan file media besar lokal secara otomatis telah dilindungi melalui `.gitignore` sehingga tidak akan pernah terunggah ke repositori publik.
