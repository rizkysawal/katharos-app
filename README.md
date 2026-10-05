# Katharos — Alkitab Online Web Reader

Aplikasi web pembaca Alkitab modern, minimalis, dan *distraction-free* dengan inspirasi desain ala Bible.com / YouVersion.

---

## 🏗️ Arsitektur Monorepo

```
katharos-app/
├── backend/                  # Golang REST API Service
│   ├── cmd/api/main.go       # Server entrypoint & graceful shutdown
│   ├── internal/
│   │   ├── config/           # Environtment configuration loader
│   │   ├── database/         # PostgreSQL connection & pool setup
│   │   ├── handler/          # HTTP handlers (translations, books, read, search, health)
│   │   ├── middleware/       # CORS middleware
│   │   ├── model/            # Domain models & response structures
│   │   └── repository/       # Clean architecture data access layer
│   ├── migrations/           # Skema DDL & SQL Seed scripts
│   │   ├── 01_init_schema.sql
│   │   └── 02_seed_data.sql
│   ├── Dockerfile            # Multi-stage production build
│   ├── go.mod
│   └── go.sum
├── frontend/                 # React (Vite) + Tailwind CSS SPA
│   ├── public/               # Favicon & static assets
│   ├── src/
│   │   ├── components/       # Header, BookChapterPicker, ReaderView, VerseActionBar, etc.
│   │   ├── context/          # BibleContext (state reader, sorotan, navigasi)
│   │   ├── services/         # API fetch client dengan graceful fallback
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css         # Theme variables (Light, Sepia, Dark) & highlight styling
│   ├── Dockerfile            # Multi-stage build (Node build -> Nginx alpine)
│   ├── nginx.conf            # Reverse proxy & SPA routing
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── docker-compose.yml        # Orchestrator (DB + Backend + Frontend/Nginx)
├── .env.example              # Template variabel konfigurasi
└── README.md
```

---

## 🚀 Cara Menjalankan Aplikasi

### Opsi 1: Menggunakan Docker Compose (Direkomendasikan & Siap TrueNAS)

Cukup satu perintah untuk menjalankan seluruh stack (Database PostgreSQL 16 + Auto Seed, Backend Golang API, dan Frontend React Nginx):

```bash
# 1. Salin konfigurasi environment
cp .env.example .env

# 2. Jalankan seluruh container di background
docker compose up --build -d
```

- **Frontend Reader**: Buka browser di [http://localhost:3000](http://localhost:3000)
- **Backend API**: Buka di [http://localhost:8080/api/health](http://localhost:8080/api/health)
- **PostgreSQL**: Terhubung di `localhost:5432` (Database: `katharos_db`, User: `katharos_user`)

---

### Opsi 2: Menjalankan Secara Lokal untuk Development

Jika ingin melakukan koding aktif di laptop:

#### 1. Jalankan Database PostgreSQL
Gunakan Docker untuk menjalankan PostgreSQL saja:
```bash
docker compose up -d database
```
*Skema dan seed data (`01_init_schema.sql` dan `02_seed_data.sql`) akan langsung dieksekusi secara otomatis saat database pertama kali menyala.*

#### 2. Jalankan Backend (Golang)
Buka terminal baru di folder `backend/`:
```bash
cd backend

# Pastikan Go 1.22+ terpasang
go mod download
go run ./cmd/api
```
Backend akan aktif di `http://localhost:8080`.

#### 3. Jalankan Frontend (React + Vite)
Buka terminal baru di folder `frontend/`:
```bash
cd frontend

# Pasang dependencies
npm install

# Jalankan dev server Vite
npm run dev
```
Frontend akan aktif di `http://localhost:5173`. Semua request `/api/*` otomatis di-proxy oleh Vite ke port `8080`.

---

## 📡 Daftar Endpoint RESTful API

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/health` | Status kesehatan server & status koneksi database |
| `GET` | `/api/v1/translations` | Daftar seluruh versi terjemahan (TB, BIMK, KJV) |
| `GET` | `/api/v1/books?translation=TB` | Daftar 66 kitab kanonik dengan urutan & jumlah pasal |
| `GET` | `/api/v1/read?book=GEN&chapter=1&translation=TB` | Mengambil seluruh ayat 1 pasal lengkap dengan navigasi Prev/Next |
| `GET` | `/api/v1/search?q=terang&translation=TB&page=1&limit=20` | Full-text search (tsvector + pg_trgm) pada ayat |

---

## 🎨 Fitur Frontend Web Reader

1. **Header Distraction-Free**:
   - Quick selector pill: Nama Kitab & Pasal (contoh: "Kejadian 1 ▾").
   - Dropdown pemilih terjemahan (TB / BIMK / KJV).
   - Pencarian cepat modal (`Ctrl+K`).
   - Pengaturan tampilan font (`Aa`).
2. **Modal Pemilih Kitab & Pasal**:
   - Filter cepat dengan pencarian teks ("Kej", "Mat", "Yoh", dll).
   - Tab Perjanjian Lama (39 kitab) dan Perjanjian Baru (27 kitab).
   - Grid angka pasal interaktif (1, 2, 3...).
3. **Pengalaman Membaca Modern**:
   - Opsi Font: Gaya **Serif** (Lora) atau **Sans-Serif** (Plus Jakarta Sans).
   - 4 pilihan ukuran font: Kecil, Normal, Besar, Sangat Besar.
   - 3 Tema visual: **Terang** (Parchment), **Sepia** (Warm Book Paper), dan **Gelap** (OLED Dark).
   - Penomoran ayat superscript kecil yang rapi di samping teks ayat.
4. **Interaksi Ayat & Sorotan (Highlight)**:
   - Klik ayat untuk memilih satu atau beberapa ayat sekaligus.
   - Action bar mengambang (*floating toolbar*) di bagian bawah.
   - Pilihan warna sorotan: Kuning, Hijau, Biru, dan Pink (tersimpan di `localStorage`).
   - Salin ayat otomatis terformat dengan kutipan:  
     `"Pada mulanya Allah menciptakan langit dan bumi." - Kejadian 1:1 (TB)`
5. **Navigasi Bab**:
   - Tombol *Previous Chapter* dan *Next Chapter* di bagian bawah dengan preview nama kitab & pasal.
