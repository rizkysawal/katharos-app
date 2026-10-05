-- 04_auth_users.sql
-- Authentication & Authorization Schema (Users Table and Initial Seed)

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255),               -- NULL if registered via Google OAuth
    google_id VARCHAR(100) UNIQUE,             -- Google Sub / Profile ID
    full_name VARCHAR(150) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'writer', 'admin')),
    auth_provider VARCHAR(20) NOT NULL DEFAULT 'local' CHECK (auth_provider IN ('google', 'local')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Seed default Super Admin and Writer accounts
-- Default Passwords:
-- Admin:  AdminKatharos2026!
-- Writer: WriterKatharos2026!
INSERT INTO users (email, password_hash, full_name, role, auth_provider)
VALUES 
(
    'admin@katharos.or.id',
    '$2a$10$3Z5N/f13R3jL0VcpCOTbv.D4oTeZBa/6s5yeToKwCQxNgifZboQPy',
    'Super Admin Katharos',
    'admin',
    'local'
),
(
    'writer@katharos.or.id',
    '$2a$10$hIn.6JekFq/.tgtVSjP4B.j0wK6L/Z1qrtqdrYMgSepfb.yzyV4Ji',
    'Penulis Renungan PMK',
    'writer',
    'local'
)
ON CONFLICT (email) DO UPDATE 
SET password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    auth_provider = EXCLUDED.auth_provider,
    full_name = EXCLUDED.full_name;
