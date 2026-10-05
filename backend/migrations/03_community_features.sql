-- 03_community_features.sql
-- Community Features: Devotionals (Renungan Harian) & Events (Jadwal Kegiatan PMK)

-- 1. Table Devotionals
CREATE TABLE IF NOT EXISTS devotionals (
    id SERIAL PRIMARY KEY,
    publish_date DATE UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150),
    passage_ref VARCHAR(100),       -- e.g. "Yohanes 15:1-8"
    passage_text TEXT,
    content TEXT NOT NULL,
    prayer TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_devotionals_date ON devotionals(publish_date);

-- 2. Table Events
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50),           -- 'Ibadah Jumat', 'Persekutuan Doa', 'Kelompok Kecil', dll.
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    location VARCHAR(255),
    google_maps_url TEXT,
    speaker VARCHAR(150),
    notes TEXT,
    is_alert BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
CREATE INDEX IF NOT EXISTS idx_events_is_alert ON events(is_alert);

-- 3. Seed / Dummy Data
-- Seed Renungan Hari Ini (CURRENT_DATE)
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, prayer)
VALUES (
    CURRENT_DATE,
    'Tinggal di dalam Pokok Anggur yang Benar',
    'Tim Pembina PMK Katharos',
    'Yohanes 15:4-5',
    'Tinggallah di dalam Aku dan Aku di dalam kamu. Sama seperti ranting tidak dapat berbuah dari dirinya sendiri, jikalau ia tidak tinggal pada pokok anggur, demikian juga kamu tidak berbuah, jikalau kamu tidak tinggal di dalam Aku. Akulah pokok anggur dan kamulah ranting-rantingnya.',
    'Dalam dinamika kehidupan kampus dan kesibukan sehari-hari, seringkali kita terjebak dalam ilusi bahwa keberhasilan dan damai sejahtera dapat kita raih semata-mata dengan kekuatan kita sendiri. Kita bekerja keras menyelesaikan tugas, aktif berorganisasi, dan mengejar target akademis, hingga terkadang waktu bersekutu dengan Tuhan terpinggirkan.

Namun Yesus mengingatkan kita dengan analogi yang sangat jelas: ranting yang terlepas dari pokoknya tidak akan mampu menghasilkan buah apa pun. Segala keindahan daunnya akan layu, dan kekuatannya akan sirna. Tinggal di dalam Kristus bukan sekadar menghadiri ibadah mingguan, melainkan membangun hubungan yang intim dan hidup setiap hari melalui doa, membaca firman, dan menundukkan kehendak kita pada kehendak-Nya.

Ketika kita melekat pada pokok anggur yang sejati, aliran kasih, hikmat, dan damai Kristus akan mengalir dalam setiap pikiran dan tindakan kita. Di tengah ujian dan tekanan apa pun, kita akan dimampukan berbuah lebat—buah kasih, sukacita, dan ketabahan yang memberkati orang-orang di sekitar kita.',
    'Tuhan Yesus yang baik, terima kasih karena Engkau telah memilih dan memanggil kami untuk menjadi bagian dari ranting-ranting-Mu. Ampuni kami jika seringkali kami merasa mampu berjalan sendiri dan menjauh dari hadirat-Mu. Ajar kami untuk senantiasa tinggal di dalam-Mu setiap hari, mempercayakan setiap pergumulan studi, masa depan, dan keluarga ke dalam tangan-Mu yang penuh kuasa. Biarlah hidup kami menghasilkan buah yang memuliakan nama-Mu. Amin.'
)
ON CONFLICT (publish_date) DO UPDATE
SET title = EXCLUDED.title,
    author = EXCLUDED.author,
    passage_ref = EXCLUDED.passage_ref,
    passage_text = EXCLUDED.passage_text,
    content = EXCLUDED.content,
    prayer = EXCLUDED.prayer;

-- Seed 3 Agenda PMK Terdekat
INSERT INTO events (title, category, start_time, end_time, location, google_maps_url, speaker, notes, is_alert)
VALUES
(
    'Ibadah Raya PMK: Faith in the Storm',
    'Ibadah Jumat',
    (CURRENT_DATE + INTERVAL '4 days' + TIME '17:00:00'),
    (CURRENT_DATE + INTERVAL '4 days' + TIME '19:30:00'),
    'Gedung Serbaguna Lt. 3 (Ruang Utama)',
    'https://maps.google.com/?q=Gedung+Serbaguna',
    'Pdt. Samuel Hartanto, M.Th',
    'PEMBERITAHUAN: Lokasi dipindahkan ke Gedung Serbaguna Lt. 3 karena ruang Audiovisual sedang dalam pemeliharaan AC. Harap hadir 15 menit lebih awal untuk registrasi dan doa bersama.',
    TRUE
),
(
    'Persekutuan Doa & Puasa Bersama',
    'Persekutuan Doa',
    (CURRENT_DATE + INTERVAL '7 days' + TIME '18:00:00'),
    (CURRENT_DATE + INTERVAL '7 days' + TIME '19:30:00'),
    'Ruang Doa Kampus & Hybrid Zoom',
    'https://maps.google.com/?q=Ruang+Doa+Kampus',
    'Divisi Doa & Konseling PMK',
    'Membawa pokok doa pergumulan mahasiswa, persiapan regenerasi pengurus, serta keluarga dan bangsa. Link zoom akan dibagikan di grup WhatsApp H-1.',
    FALSE
),
(
    'Bible Study & Fellowship Kelompok Kecil',
    'Kelompok Kecil',
    (CURRENT_DATE + INTERVAL '11 days' + TIME '15:30:00'),
    (CURRENT_DATE + INTERVAL '11 days' + TIME '17:30:00'),
    'Gazebo Taman Barat & Kantin Mahasiswa',
    'https://maps.google.com/?q=Gazebo+Taman+Kampus',
    'Fasilitator KK Katharos',
    'Tema: "Iman Tanpa Perbuatan Adalah Mati" (Studi Kitab Yakobus 2). Jangan lupa membawa Alkitab fisik atau aplikasi Katharos!',
    FALSE
)
ON CONFLICT DO NOTHING;
