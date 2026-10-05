#!/usr/bin/env python3
"""
Katharos Bible Seeder Script (Terjemahan Baru - TB)
===================================================
Mengunduh dataset Alkitab Terjemahan Baru (TB) lengkap 66 kitab (1.189 pasal, 31.102 ayat)
dalam format JSON dari repository publik GitHub, lalu melakukan batch insert langsung
ke PostgreSQL (tabel translations, books, chapters, verses).

Penggunaan:
    python3 scripts/seed_bible.py
    
Argumen Opsional:
    --host        Host database PostgreSQL (default: localhost atau env DB_HOST)
    --port        Port database PostgreSQL (default: 5432 atau env DB_PORT)
    --user        User database PostgreSQL (default: katharos_user atau env POSTGRES_USER / DB_USER)
    --password    Password database PostgreSQL (default: katharos_secret atau env POSTGRES_PASSWORD / DB_PASSWORD)
    --dbname      Nama database PostgreSQL (default: katharos_db atau env POSTGRES_DB / DB_NAME)
    --url         URL dataset JSON (default: raw github jameschristianw/alkitab-data)
    --file        Gunakan file JSON lokal alih-alih mengunduh dari internet
    --batch-size  Ukuran batch per query insert ayat (default: 1000)
"""

import sys
import os
import json
import time
import argparse
import urllib.request
import subprocess

DEFAULT_DATASET_URL = "https://raw.githubusercontent.com/jameschristianw/alkitab-data/main/books/v1/Alkitab.json"

# Canonical metadata untuk 66 kitab Alkitab
CANONICAL_BOOKS = [
    (1, 'GEN', 'Kejadian', 'Kej', 'OT', 50),
    (2, 'EXO', 'Keluaran', 'Kel', 'OT', 40),
    (3, 'LEV', 'Imamat', 'Im', 'OT', 27),
    (4, 'NUM', 'Bilangan', 'Bil', 'OT', 36),
    (5, 'DEU', 'Ulangan', 'Ul', 'OT', 34),
    (6, 'JOS', 'Yosua', 'Yos', 'OT', 24),
    (7, 'JDG', 'Hakim-hakim', 'Hak', 'OT', 21),
    (8, 'RUT', 'Rut', 'Rut', 'OT', 4),
    (9, '1SA', '1 Samuel', '1Sam', 'OT', 31),
    (10, '2SA', '2 Samuel', '2Sam', 'OT', 24),
    (11, '1KI', '1 Raja-raja', '1Raj', 'OT', 22),
    (12, '2KI', '2 Raja-raja', '2Raj', 'OT', 25),
    (13, '1CH', '1 Tawarikh', '1Taw', 'OT', 29),
    (14, '2CH', '2 Tawarikh', '2Taw', 'OT', 36),
    (15, 'EZR', 'Ezra', 'Ezr', 'OT', 10),
    (16, 'NEH', 'Nehemia', 'Neh', 'OT', 13),
    (17, 'EST', 'Ester', 'Est', 'OT', 10),
    (18, 'JOB', 'Ayub', 'Ayb', 'OT', 42),
    (19, 'PSA', 'Mazmur', 'Mzm', 'OT', 150),
    (20, 'PRO', 'Amsal', 'Ams', 'OT', 31),
    (21, 'ECC', 'Pengkhotbah', 'Pkh', 'OT', 12),
    (22, 'SNG', 'Kidung Agung', 'Kid', 'OT', 8),
    (23, 'ISA', 'Yesaya', 'Yes', 'OT', 66),
    (24, 'JER', 'Yeremia', 'Yer', 'OT', 52),
    (25, 'LAM', 'Ratapan', 'Rat', 'OT', 5),
    (26, 'EZK', 'Yehezkiel', 'Yeh', 'OT', 48),
    (27, 'DAN', 'Daniel', 'Dan', 'OT', 12),
    (28, 'HOS', 'Hosea', 'Hos', 'OT', 14),
    (29, 'JOL', 'Yoel', 'Yl', 'OT', 3),
    (30, 'AMO', 'Amos', 'Am', 'OT', 9),
    (31, 'OBA', 'Obaja', 'Ob', 'OT', 1),
    (32, 'JON', 'Yunus', 'Yun', 'OT', 4),
    (33, 'MIC', 'Mikha', 'Mik', 'OT', 7),
    (34, 'NAM', 'Nahum', 'Nah', 'OT', 3),
    (35, 'HAB', 'Habakuk', 'Hab', 'OT', 3),
    (36, 'ZEP', 'Zefanya', 'Zef', 'OT', 3),
    (37, 'HAG', 'Hagai', 'Hag', 'OT', 2),
    (38, 'ZEC', 'Zakharia', 'Za', 'OT', 14),
    (39, 'MAL', 'Maleakhi', 'Mal', 'OT', 4),
    (40, 'MAT', 'Matius', 'Mat', 'NT', 28),
    (41, 'MRK', 'Markus', 'Mrk', 'NT', 16),
    (42, 'LUK', 'Lukas', 'Luk', 'NT', 24),
    (43, 'JHN', 'Yohanes', 'Yoh', 'NT', 21),
    (44, 'ACT', 'Kisah Para Rasul', 'Kis', 'NT', 28),
    (45, 'ROM', 'Roma', 'Rm', 'NT', 16),
    (46, '1CO', '1 Korintus', '1Kor', 'NT', 16),
    (47, '2CO', '2 Korintus', '2Kor', 'NT', 13),
    (48, 'GAL', 'Galatia', 'Gal', 'NT', 6),
    (49, 'EPH', 'Efesus', 'Ef', 'NT', 6),
    (50, 'PHP', 'Filipi', 'Flp', 'NT', 4),
    (51, 'COL', 'Kolose', 'Kol', 'NT', 4),
    (52, '1TH', '1 Tesalonika', '1Tes', 'NT', 5),
    (53, '2TH', '2 Tesalonika', '2Tes', 'NT', 3),
    (54, '1TI', '1 Timotius', '1Tim', 'NT', 6),
    (55, '2TI', '2 Timotius', '2Tim', 'NT', 4),
    (56, 'TIT', 'Titus', 'Tit', 'NT', 3),
    (57, 'PHM', 'Filemon', 'Flm', 'NT', 1),
    (58, 'HEB', 'Ibrani', 'Ibr', 'NT', 13),
    (59, 'JAS', 'Yakobus', 'Yak', 'NT', 5),
    (60, '1PE', '1 Petrus', '1Ptr', 'NT', 5),
    (61, '2PE', '2 Petrus', '2Ptr', 'NT', 3),
    (62, '1JN', '1 Yohanes', '1Yoh', 'NT', 5),
    (63, '2JN', '2 Yohanes', '2Yoh', 'NT', 1),
    (64, '3JN', '3 Yohanes', '3Yoh', 'NT', 1),
    (65, 'JUD', 'Yudas', 'Yud', 'NT', 1),
    (66, 'REV', 'Wahyu', 'Why', 'NT', 22)
]

def ensure_dependencies():
    """Memastikan driver PostgreSQL (psycopg2-binary) terinstal."""
    try:
        import psycopg2
        return psycopg2
    except ImportError:
        print("[Katharos Seeder] psycopg2 tidak ditemukan, mencoba menginstal psycopg2-binary otomatis...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "psycopg2-binary", "--quiet"])
            import psycopg2
            print("[Katharos Seeder] psycopg2-binary berhasil diinstal.")
            return psycopg2
        except Exception as e:
            print(f"[Katharos Seeder ERROR] Gagal menginstal psycopg2-binary: {e}")
            print("Silakan jalankan secara manual: pip install psycopg2-binary")
            sys.exit(1)

def fetch_dataset(url, local_file=None):
    """Mengunduh atau membaca dataset JSON Alkitab."""
    if local_file and os.path.exists(local_file):
        print(f"[Katharos Seeder] Membaca dataset dari file lokal: {local_file}")
        with open(local_file, "r", encoding="utf-8") as f:
            return json.load(f)
    
    print(f"[Katharos Seeder] Mengunduh dataset Alkitab dari: {url}")
    req = urllib.request.Request(url, headers={"User-Agent": "Katharos-Bible-Seeder/1.0"})
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode("utf-8")
        data = json.loads(content)
        print(f"[Katharos Seeder] Unduhan selesai ({len(content) / 1024 / 1024:.2f} MB).")
        return data

def main():
    parser = argparse.ArgumentParser(description="Katharos Bible TB Seeder")
    parser.add_argument("--host", default=os.getenv("DB_HOST", "localhost"), help="PostgreSQL Host")
    parser.add_argument("--port", type=int, default=int(os.getenv("DB_PORT", "5432")), help="PostgreSQL Port")
    parser.add_argument("--user", default=os.getenv("POSTGRES_USER", os.getenv("DB_USER", "katharos_user")), help="PostgreSQL User")
    parser.add_argument("--password", default=os.getenv("POSTGRES_PASSWORD", os.getenv("DB_PASSWORD", "katharos_secret")), help="PostgreSQL Password")
    parser.add_argument("--dbname", default=os.getenv("POSTGRES_DB", os.getenv("DB_NAME", "katharos_db")), help="PostgreSQL DB Name")
    parser.add_argument("--url", default=DEFAULT_DATASET_URL, help="URL JSON Dataset")
    parser.add_argument("--file", default=None, help="Path ke file JSON lokal")
    parser.add_argument("--batch-size", type=int, default=1000, help="Batch size untuk insert ayat")
    
    args = parser.parse_args()

    # 1. Pastikan dependency driver
    psycopg2 = ensure_dependencies()
    from psycopg2.extras import execute_values

    # 2. Ambil dataset
    data = fetch_dataset(args.url, args.file)
    
    books_data = []
    if "books" in data:
        books_data.extend(data["books"].get("old_testament", []))
        books_data.extend(data["books"].get("new_testament", []))
    else:
        print("[Katharos Seeder ERROR] Format dataset tidak dikenali (tidak ada key 'books').")
        sys.exit(1)

    print(f"[Katharos Seeder] Terbaca {len(books_data)} kitab dari dataset.")
    if len(books_data) != 66:
        print(f"[Katharos Seeder WARNING] Jumlah kitab adalah {len(books_data)}, diharapkan 66.")

    # 3. Koneksi ke Database PostgreSQL
    print(f"[Katharos Seeder] Menghubungkan ke PostgreSQL {args.user}@{args.host}:{args.port}/{args.dbname}...")
    start_time = time.time()
    try:
        conn = psycopg2.connect(
            host=args.host,
            port=args.port,
            user=args.user,
            password=args.password,
            dbname=args.dbname
        )
        conn.autocommit = False
        cur = conn.cursor()
    except Exception as e:
        print(f"[Katharos Seeder ERROR] Gagal terhubung ke database: {e}")
        sys.exit(1)

    try:
        # A. Upsert Translation 'TB'
        cur.execute("""
            INSERT INTO translations (code, name, language)
            VALUES ('TB', 'Terjemahan Baru (LAI)', 'id')
            ON CONFLICT (code) DO UPDATE
            SET name = EXCLUDED.name, language = EXCLUDED.language
            RETURNING id;
        """)
        tb_id = cur.fetchone()[0]
        print(f"[Katharos Seeder] Translation 'TB' siap (ID: {tb_id}).")

        # B. Upsert 66 Books
        print("[Katharos Seeder] Menyiapkan 66 Kitab kanonikal...")
        book_records = [
            (tb_id, order_num, code, name, abbr, testament, total_ch)
            for order_num, code, name, abbr, testament, total_ch in CANONICAL_BOOKS
        ]
        execute_values(cur, """
            INSERT INTO books (translation_id, order_num, code, name, abbreviation, testament, total_chapters)
            VALUES %s
            ON CONFLICT (translation_id, code) DO UPDATE
            SET order_num = EXCLUDED.order_num,
                name = EXCLUDED.name,
                abbreviation = EXCLUDED.abbreviation,
                testament = EXCLUDED.testament,
                total_chapters = EXCLUDED.total_chapters;
        """, book_records)

        # Ambil pemetaan book_id berdasarkan order_num
        cur.execute("SELECT order_num, id FROM books WHERE translation_id = %s;", (tb_id,))
        order_to_book_id = dict(cur.fetchall())

        # C. Upsert Chapters
        print("[Katharos Seeder] Menyiapkan seluruh pasal (chapters)...")
        chapter_records = []
        for b_raw in books_data:
            order_num = b_raw.get("book_number")
            book_id = order_to_book_id.get(order_num)
            if not book_id:
                continue
            chapters = b_raw.get("chapters", [])
            for ch in chapters:
                ch_num = ch.get("chapter_number")
                chapter_records.append((book_id, ch_num))

        execute_values(cur, """
            INSERT INTO chapters (book_id, chapter_number)
            VALUES %s
            ON CONFLICT (book_id, chapter_number) DO NOTHING;
        """, chapter_records)

        # Ambil pemetaan chapter_id: (book_id, chapter_number) -> chapter_id
        cur.execute("""
            SELECT c.book_id, c.chapter_number, c.id
            FROM chapters c
            JOIN books b ON c.book_id = b.id
            WHERE b.translation_id = %s;
        """, (tb_id,))
        ch_map = {(row[0], row[1]): row[2] for row in cur.fetchall()}
        print(f"[Katharos Seeder] Terdaftar {len(ch_map)} pasal di database.")

        # D. Batch Insert Verses
        print("[Katharos Seeder] Mengumpulkan dan menyiapkan ayat-ayat Alkitab...")
        verse_records = []
        for b_raw in books_data:
            order_num = b_raw.get("book_number")
            book_id = order_to_book_id.get(order_num)
            if not book_id:
                continue
            for ch in b_raw.get("chapters", []):
                ch_num = ch.get("chapter_number")
                ch_id = ch_map.get((book_id, ch_num))
                if not ch_id:
                    continue
                for v in ch.get("verses", []):
                    v_num = v.get("number")
                    v_text = v.get("text", "").strip()
                    if v_num and v_text:
                        verse_records.append((ch_id, v_num, v_text))

        total_verses = len(verse_records)
        print(f"[Katharos Seeder] Total ayat siap insert: {total_verses:,}")

        # Insert dalam batch
        batch_size = args.batch_size
        inserted = 0
        insert_sql = """
            INSERT INTO verses (chapter_id, verse_number, text)
            VALUES %s
            ON CONFLICT (chapter_id, verse_number) DO UPDATE
            SET text = EXCLUDED.text;
        """

        for i in range(0, total_verses, batch_size):
            chunk = verse_records[i:i + batch_size]
            execute_values(cur, insert_sql, chunk)
            inserted += len(chunk)
            pct = (inserted / total_verses) * 100
            print(f"  -> Progress: {inserted:,}/{total_verses:,} ayat ({pct:.1f}%)...")

        conn.commit()
        cur.close()
        conn.close()

        elapsed = time.time() - start_time
        print(f"\n[Katharos Seeder BERHASIL] Selesai dalam {elapsed:.2f} detik!")
        print(f"Total data Alkitab TB: 66 Kitab, {len(ch_map):,} Pasal, {total_verses:,} Ayat tersimpan lengkap di database.")

    except Exception as e:
        if conn:
            conn.rollback()
        print(f"\n[Katharos Seeder GAGAL] Terjadi kesalahan: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
