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
  user_id?: string
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
  updated_at?: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

// Curated high quality showcase projects used as default/fallback when DB is empty
export const DEFAULT_SHOWCASE_PROJECTS: Project[] = [
  {
    id: 'demo-1',
    title: 'NexusPay — Modern Fintech & Billing Analytics',
    description:
      'Platform analitik finansial & dashboard pembayaran berbasis React, Next.js, dan Chart.js dengan pemantauan mutasi transaksi realtime, invoice generator, dan multi-currency support.',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Chart.js'],
    live_url: 'https://nexuspay-demo.vercel.app',
    github_url: 'https://github.com/muhammadauliaputraai-droid/nexuspay-dashboard',
    is_featured: true,
    status: 'published',
    category: 'Web App',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Lumina Store — Headless E-Commerce & Checkout',
    description:
      'Toko online modern berkecepatan tinggi dengan keranjang belanja realtime, pencarian instan, filter produk multi-kategori, dan integrasi payment gateway Midtrans & Stripe.',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    tech_stack: ['React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Zustand'],
    live_url: 'https://lumina-store.vercel.app',
    github_url: 'https://github.com/muhammadauliaputraai-droid/lumina-ecommerce',
    is_featured: true,
    status: 'published',
    category: 'Fullstack',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'demo-3',
    title: 'DevPulse — Developer Social Collaboration Hub',
    description:
      'Platform jejaring & kolaborasi sesama engineer untuk berbagi repositori, snippet kode interaktif dengan syntax highlight, serta forum diskusi teknis dengan autentikasi GitHub OAuth.',
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'WebSocket'],
    live_url: 'https://devpulse-hub.vercel.app',
    github_url: 'https://github.com/muhammadauliaputraai-droid/devpulse-community',
    is_featured: true,
    status: 'published',
    category: 'Fullstack',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 'demo-4',
    title: 'TaskFlow Pro — Agile Sprint & Kanban Workspace',
    description:
      'Sistem manajemen proyek tim dengan drag-and-drop Kanban board interaktif, pelacakan sprint, time tracking, dan sinkronisasi data realtime multi-pengguna.',
    image_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1000&auto=format&fit=crop',
    tech_stack: ['React', 'TypeScript', 'Supabase Realtime', 'dnd-kit', 'Shadcn UI'],
    live_url: 'https://taskflow-pro.vercel.app',
    github_url: 'https://github.com/muhammadauliaputraai-droid/taskflow-pro',
    is_featured: false,
    status: 'published',
    category: 'Web App',
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
  {
    id: 'demo-5',
    title: 'Aura UI — Modern Glassmorphism Component Library',
    description:
      'Koleksi komponen UI reusable bergaya glassmorphism dengan aksesibilitas WCAG penuh, micro-interactions 60fps, dan token tema dinamis dark/light mode.',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    tech_stack: ['Tailwind CSS', 'Radix UI', 'TypeScript', 'Storybook'],
    live_url: 'https://aura-ui.vercel.app',
    github_url: 'https://github.com/muhammadauliaputraai-droid/aura-design-system',
    is_featured: false,
    status: 'published',
    category: 'UI/UX',
    created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: 'demo-6',
    title: 'MediCare AI — Smart Healthcare Booking Platform',
    description:
      'Aplikasi reservasi dokter dan konsultasi medis terintegrasi dengan reminder jadwal via WhatsApp, rekam medis terenkripsi, dan antarmuka responsif.',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    tech_stack: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Twilio API'],
    live_url: 'https://medicare-app.vercel.app',
    github_url: 'https://github.com/muhammadauliaputraai-droid/medicare-platform',
    is_featured: false,
    status: 'published',
    category: 'Mobile',
    created_at: new Date(Date.now() - 86400000 * 25).toISOString(),
  },
]
