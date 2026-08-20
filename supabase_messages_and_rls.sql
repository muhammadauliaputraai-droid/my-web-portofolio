-- ==============================================================================
-- SQL MIGRATION & RLS SETUP: PROJECTS, MESSAGES & STORAGE
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. TABLE: MESSAGES (Formulir Kontak Portofolio)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) on messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent duplication
DROP POLICY IF EXISTS "Allow public insert messages" ON public.messages;
DROP POLICY IF EXISTS "Allow authenticated admin read messages" ON public.messages;
DROP POLICY IF EXISTS "Allow authenticated admin update messages" ON public.messages;
DROP POLICY IF EXISTS "Allow authenticated admin delete messages" ON public.messages;

-- RLS Policy: Anyone (anon visitor) can send a message through the contact form
CREATE POLICY "Allow public insert messages"
ON public.messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- RLS Policy: Only logged-in admin can read messages
CREATE POLICY "Allow authenticated admin read messages"
ON public.messages
FOR SELECT
TO authenticated
USING (true);

-- RLS Policy: Only logged-in admin can mark message as read
CREATE POLICY "Allow authenticated admin update messages"
ON public.messages
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- RLS Policy: Only logged-in admin can delete messages
CREATE POLICY "Allow authenticated admin delete messages"
ON public.messages
FOR DELETE
TO authenticated
USING (true);


-- 2. TABLE: PROJECTS (Row Level Security & Policies)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users full access projects" ON public.projects;

-- RLS Policy: Public visitors can ONLY view projects that are published
CREATE POLICY "Public can view published projects"
ON public.projects
FOR SELECT
TO anon, authenticated
USING (status = 'published' OR auth.role() = 'authenticated');

-- RLS Policy: Authenticated admin can create, update, delete projects
CREATE POLICY "Authenticated users full access projects"
ON public.projects
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);


-- 3. STORAGE: PROJECT-IMAGES BUCKET
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS Policies
DROP POLICY IF EXISTS "Public View Project Images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Project Images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Project Images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Project Images" ON storage.objects;

-- Allow public viewing of uploaded project images
CREATE POLICY "Public View Project Images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'project-images');

-- Allow authenticated admin to upload, update and delete images
CREATE POLICY "Admin Upload Project Images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Admin Update Project Images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'project-images')
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Admin Delete Project Images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'project-images');
