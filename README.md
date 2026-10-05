# Katharos — Alkitab Online & Komunitas PMK

Aplikasi web pembaca Alkitab modern, minimalis, dan *distraction-free* terintegrasi dengan landing page komunitas (Renungan Harian & Jadwal Kegiatan PMK).

---

## 🏗️ Arsitektur Monorepo

```
katharos-app/
├── backend/                  # Golang REST API Service
│   ├── cmd/api/main.go       # Server entrypoint & route registration
│   ├── internal/
│   │   ├── config/           # Environtment configuration loader
│   │   ├── database/         # PostgreSQL connection & pool setup
│   │   ├── handler/          # HTTP handlers (bible, devotionals, events, health)
│   │   ├── middleware/       # CORS middleware
│   │   ├── model/            # Domain models (bible, community)
│   │   └── repository/       # Clean architecture data access layer
│   ├── migrations/           # Skema DDL & SQL Seed scripts
│   │   ├── 01_init_schema.sql
│   │   ├── 02_seed_data.sql
│   │   └── 03_community_features.sql
│   ├── Dockerfile            # Multi-stage production build
│   ├── go.mod
│   └── go.sum
├── frontend/                 # React (Vite) + Tailwind CSS SPA
│   ├── public/               # Favicon & static assets
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx      # Landing Page Komunitas (Renungan, Agenda PMK, Alert Banner)
│   │   │   └── Reader.jsx    # Halaman Pembaca Alkitab Lengkap (/read)
│   │   ├── components/       # Header, BookChapterPicker, ReaderView, VerseActionBar, etc.
│   │   ├── context/          # BibleContext (state reader, sorotan, preferensi)
│   │   ├── services/         # API fetch client dengan graceful fallback
│   │   ├── App.jsx           # React Router routing (/ dan /read)
│   │   ├── main.jsx
│   │   └── index.css         # Theme variables (Light, Sepia, Dark) & highlight styling
│   ├── Dockerfile            # Multi-stage build (Node build -> Nginx alpine)
│   ├── nginx.conf            # Reverse proxy /api/ & SPA router
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

- **Landing Page Komunitas**: Buka browser di [http://localhost:3001](http://localhost:3001) (rute `/`)
- **Pembaca Alkitab Digital**: Buka di [http://localhost:3001/read](http://localhost:3001/read)
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
*Skema dan seed data (`01`, `02`, dan `03`) akan langsung dieksekusi secara otomatis saat database pertama kali menyala.*

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

### Modul Alkitab (Bible)
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/health` | Status kesehatan server & status koneksi database |
| `GET` | `/api/v1/translations` | Daftar seluruh versi terjemahan (TB, BIMK, KJV) |
| `GET` | `/api/v1/books?translation=TB` | Daftar 66 kitab kanonik dengan urutan & jumlah pasal |
| `GET` | `/api/v1/read?book=GEN&chapter=1&translation=TB` | Mengambil seluruh ayat 1 pasal lengkap dengan navigasi Prev/Next |
| `GET` | `/api/v1/search?q=terang&translation=TB&page=1&limit=20` | Full-text search (tsvector + pg_trgm) pada ayat |

### Modul Komunitas (Devotionals & Events)
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/v1/devotionals/today` | Mengambil renungan harian sesuai tanggal sistem saat ini |
| `GET` | `/api/v1/devotionals?month=X&year=Y` | Arsip renungan bulanan |
| `POST` | `/api/v1/devotionals` | Tambah renungan baru (payload JSON) |
| `GET` | `/api/v1/events/upcoming` | List kegiatan PMK mendatang terurut dari waktu terdekat |
| `POST` | `/api/v1/events` | Tambah agenda kegiatan baru |

### Modul Autentikasi & Keamanan (Auth & RBAC)
| Method | Endpoint | Proteksi Role | Deskripsi |
|---|---|---|---|
| `POST` | `/api/v1/auth/google` | Publik | Verifikasi Google ID token & terbitkan JWT (`role: member`) |
| `POST` | `/api/v1/auth/internal/login` | Publik (Internal) | Login lokal bcrypt khusus pengurus (`role: admin/writer`) |
| `GET` | `/api/v1/auth/me` | Bearer Token | Mengambil profil user yang sedang login |
| `GET` | `/api/v1/member/profile` | `member, writer, admin` | Akses data jemaat/member |
| `GET` | `/api/v1/writer/drafts` | `writer, admin` | Akses studio penulisan naskah |
| `GET` | `/api/v1/admin/users` | `admin` | Akses direktori pengguna terdaftar |

---

## 🔐 Arsitektur Autentikasi Dua Jalur (Two-Track Auth)

1. **Jalur Publik — Jemaat (`role = 'member'`):**
   - Tombol "Masuk dengan Google" di navbar publik (`/` dan `/read`).
   - Tidak memerlukan kata sandi. Begitu login sukses via Google, profil otomatis tersimpan sebagai Member.
   - Tidak memiliki akses ke rute pengurus `/internal/*` (otomatis di-redirect kembali ke `/`).

2. **Jalur Rahasia — Pengurus (`role = 'admin'` dan `'writer'`):**
   - **Tanpa link atau tombol apa pun di navigasi publik.**
   - Hanya dapat diakses dengan mengetikkan URL rahasia langsung di browser: **`/internal/login`**.
   - Menggunakan kredensial lokal (Username/Email + Password terenkripsi bcrypt).
   - Akun Default Seed:
     - **Super Admin:** `admin@katharos.or.id` (Password: `AdminKatharos2026!`) -> Akses `/internal/admin`
     - **Penulis:** `writer@katharos.or.id` (Password: `WriterKatharos2026!`) -> Akses `/internal/writer`

---

## 🎨 Fitur Frontend

### 1. Halaman Utama Komunitas (`/`)
- **Top Alert Banner:** Muncul dinamis jika ada agenda dengan `is_alert = true` (pindah tempat/jadwal darurat).
- **Navbar Publik:** Menampilkan tombol "Masuk dengan Google" atau avatar akun jemaat jika sudah login.
- **Renungan Hari Ini:** Teks firman, konten renungan, dan doa hari ini.
  - Pengatur ukuran font (`A-` / `A+`).
  - Tombol **Share WhatsApp** yang otomatis memformat teks kutipan dan link.
  - Tombol **Bookmark/Simpan** tersimpan ke `localStorage`.
- **Agenda PMK:** Kartu kegiatan dengan badge kategori, waktu, pembicara, lokasi Google Maps, dan tombol **Add to Google Calendar**.
- **CTA Baca Alkitab:** Tautan langsung menuju reader `/read`.

### 2. Halaman Reader Alkitab (`/read`)
- **Header Distraction-Free:** Quick selector pill kitab/pasal, dropdown terjemahan (TB/BIMK/KJV), modal search (`Ctrl+K`), tombol akun Google, dan link kembali ke Beranda.
- **Drawer Pemilih Kitab & Grid Pasal:** Pencarian kitab, filter PL (39) / PB (27), dan grid angka pasal interaktif.
- **Reader Utama:** Tipografi nyaman (Serif Lora / Sans Inter), 4 pilihan ukuran teks, tema (Terang / Sepia / Gelap), dan penomoran ayat *superscript*.
- **Interaksi Ayat:** Klik ayat untuk memunculkan floating toolbar (salin teks + referensi, pilihan warna highlight).
- **Navigasi:** Tombol Previous & Next Chapter di bagian bawah.

### 3. Halaman & Dashboard Khusus Pengurus (`/internal/*`)
- **`/internal/login`:** Gateway rahasia khusus pengurus (Admin & Penulis).
- **`/internal/admin`:** Dashboard Super Admin untuk menambah agenda kegiatan, mempublikasikan renungan, dan memantau daftar user.
- **`/internal/writer`:** Studio Penulis untuk menyusun dan menerbitkan naskah renungan harian.
