-- 01_init_schema.sql
-- Katharos Database Schema for PostgreSQL 16

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Translations Table
CREATE TABLE IF NOT EXISTS translations (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,       -- e.g. 'TB', 'BIMK', 'KJV'
    name VARCHAR(255) NOT NULL,              -- e.g. 'Terjemahan Baru', 'King James Version'
    language VARCHAR(50) NOT NULL DEFAULT 'id', -- e.g. 'id', 'en'
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Books Table
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    translation_id INT NOT NULL REFERENCES translations(id) ON DELETE CASCADE,
    order_num INT NOT NULL,                  -- 1 to 66
    code VARCHAR(10) NOT NULL,               -- e.g. 'GEN', 'JHN', 'MAT'
    name VARCHAR(100) NOT NULL,              -- e.g. 'Kejadian', 'Yohanes'
    abbreviation VARCHAR(20) NOT NULL,       -- e.g. 'Kej', 'Yoh'
    testament VARCHAR(2) NOT NULL CHECK (testament IN ('OT', 'NT')),
    total_chapters INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_books_translation_code UNIQUE (translation_id, code),
    CONSTRAINT uq_books_translation_order UNIQUE (translation_id, order_num)
);

-- 3. Chapters Table
CREATE TABLE IF NOT EXISTS chapters (
    id SERIAL PRIMARY KEY,
    book_id INT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    chapter_number INT NOT NULL,             -- 1, 2, 3...
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_chapters_book_chapter UNIQUE (book_id, chapter_number)
);

-- 4. Verses Table
CREATE TABLE IF NOT EXISTS verses (
    id BIGSERIAL PRIMARY KEY,
    chapter_id INT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
    verse_number INT NOT NULL,               -- 1, 2, 3...
    text TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_verses_chapter_verse UNIQUE (chapter_id, verse_number)
);

-- Indexes for performance & relations
CREATE INDEX IF NOT EXISTS idx_books_translation ON books(translation_id);
CREATE INDEX IF NOT EXISTS idx_books_code ON books(code);
CREATE INDEX IF NOT EXISTS idx_books_order ON books(translation_id, order_num);
CREATE INDEX IF NOT EXISTS idx_chapters_book ON chapters(book_id, chapter_number);
CREATE INDEX IF NOT EXISTS idx_verses_chapter ON verses(chapter_id, verse_number);

-- Full-Text Search and Trigram Search Indexes
CREATE INDEX IF NOT EXISTS idx_verses_fts_simple ON verses USING gin(to_tsvector('simple', text));
CREATE INDEX IF NOT EXISTS idx_verses_trgm ON verses USING gin(text gin_trgm_ops);
