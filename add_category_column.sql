-- Jalankan script ini di Supabase SQL Editor untuk menambahkan kolom kategori
-- ke tabel projects yang sudah ada.

-- Tambahkan kolom category (VARCHAR) ke tabel projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT NULL;

-- (Opsional) Buat index agar filter berdasarkan kategori lebih cepat
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
