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
  created_at: string
  updated_at: string
}
