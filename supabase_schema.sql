-- ==============================================================================
-- SCHEMA & POLICIES FOR PERSONAL PORTFOLIO
-- Jalankan query ini di Supabase SQL Editor (https://supabase.com/dashboard)
-- Query ini sudah aman dijalankan berkali-kali (idempotent).
-- ==============================================================================

-- 1. Buat tabel projects jika belum ada
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 3. Hapus policy lama terlebih dahulu jika sudah pernah dibuat (mencegah error 42710)
DROP POLICY IF EXISTS "Publik dapat melihat proyek yang dipublikasikan" ON public.projects;
DROP POLICY IF EXISTS "Pengguna dapat melihat semua proyek miliknya" ON public.projects;
DROP POLICY IF EXISTS "Pengguna dapat menambah proyek" ON public.projects;
DROP POLICY IF EXISTS "Pengguna dapat mengupdate proyek miliknya" ON public.projects;
DROP POLICY IF EXISTS "Pengguna dapat menghapus proyek miliknya" ON public.projects;
DROP POLICY IF EXISTS "Owner can manage own projects" ON public.projects;
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;

-- 4. Buat ulang policy (RLS)
-- Policy A: Siapa saja (publik) dapat melihat proyek yang statusnya 'published'
CREATE POLICY "Publik dapat melihat proyek yang dipublikasikan"
  ON public.projects
  FOR SELECT
  USING (status = 'published');

-- Policy B: User yang sudah login dapat melihat semua proyek miliknya (termasuk draft)
CREATE POLICY "Pengguna dapat melihat semua proyek miliknya"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy C: User yang login dapat menambahkan proyek
CREATE POLICY "Pengguna dapat menambah proyek"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy D: User yang login dapat mengubah proyek miliknya
CREATE POLICY "Pengguna dapat mengupdate proyek miliknya"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy E: User yang login dapat menghapus proyek miliknya
CREATE POLICY "Pengguna dapat menghapus proyek miliknya"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
