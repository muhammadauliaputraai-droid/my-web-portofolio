import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please check your .env file.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export const PROJECT_CATEGORIES = [
  'Web App',
  'Mobile',
  'UI/UX',
  'Fullstack',
  'Backend',
  'Open Source',
  'Lainnya',
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export type Project = {
  id: string
  user_id: string
  title: string
  description: string | null
  image_url: string | null
  tech_stack: string[]
  live_url: string | null
  github_url: string | null
  is_featured: boolean
  status: 'draft' | 'published'
  category: ProjectCategory | null
  created_at: string
  updated_at: string
}
