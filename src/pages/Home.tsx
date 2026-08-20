import { useEffect, useState, useMemo } from 'react'
import Navbar from '@/components/portfolio/Navbar'
import HeroSection from '@/components/portfolio/HeroSection'
import ProjectCard from '@/components/portfolio/ProjectCard'
import ProjectDetailModal from '@/components/portfolio/ProjectDetailModal'
import Footer from '@/components/portfolio/Footer'
import { supabase, PROJECT_CATEGORIES, type Project, type ProjectCategory } from '@/lib/supabase'
import { Code2, Palette, Zap, Users, Terminal, Layers, Database, Globe } from 'lucide-react'

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<'Semua' | ProjectCategory>('Semua')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (!error && data) {
      setProjects(data as Project[])
    }
    setLoading(false)
  }

  // Compute available categories from actual project data
  const availableCategories = useMemo(() => {
    const cats = new Set<string>()
    projects.forEach((p) => {
      if (p.category) cats.add(p.category)
    })
    return PROJECT_CATEGORIES.filter((c) => cats.has(c))
  }, [projects])

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Semua') return projects
    return projects.filter((p) => p.category === activeFilter)
  }, [projects, activeFilter])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const skills = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Menulis kode yang bersih, terstruktur, dan mudah dimaintenance.',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Menciptakan antarmuka yang indah dan intuitif untuk pengguna.',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimalisasi performa untuk pengalaman pengguna yang cepat.',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: Users,
      title: 'Kolaborasi',
      description: 'Bekerja sama dengan tim untuk menghasilkan produk terbaik.',
      gradient: 'from-emerald-500 to-teal-600',
    },
  ]

  const techStack = [
    { icon: Terminal, name: 'React' },
    { icon: Layers, name: 'TypeScript' },
    { icon: Database, name: 'Supabase' },
    { icon: Globe, name: 'Next.js' },
    { icon: Palette, name: 'Tailwind' },
    { icon: Code2, name: 'Node.js' },
  ]

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />

      {/* === Tech Stack Marquee === */}
      <section className="py-8 relative overflow-hidden border-y border-border/20">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="flex gap-12 animate-[shimmer_20s_linear_infinite] whitespace-nowrap">
          {[...techStack, ...techStack, ...techStack].map((tech, i) => (
            <div key={i} className="flex items-center gap-3 text-muted-foreground/50 shrink-0">
              <tech.icon className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-widest">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === About Section === */}
      <section id="about" className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 section-divider" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-red-400/5 blur-[100px] -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6 gradient-border">
              Keahlian
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
              Tentang <span className="gradient-text">Saya</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Seorang developer yang passionate dalam membangun aplikasi web modern.
              Teknologi terbaik adalah yang tidak terlihat — yang hanya terasa bekerja dengan sempurna.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((item, index) => (
              <div
                key={item.title}
                className={`group relative p-7 rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm hover-lift transition-all duration-500 hover:border-primary/20 animate-slide-up stagger-${index + 1} overflow-hidden gradient-border`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-3xl`} />
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-105`}>
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="relative font-bold text-lg mb-2.5 group-hover:text-foreground transition-colors">{item.title}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Projects Section === */}
      <section id="projects" className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 section-divider" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6 gradient-border">
              Portfolio
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
              Proyek <span className="gradient-text">Terbaru</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Beberapa proyek pilihan yang telah saya kerjakan. Setiap proyek merupakan
              kesempatan untuk belajar dan bertumbuh.
            </p>
          </div>

          {/* === Category Filter Tabs === */}
          {!loading && projects.length > 0 && availableCategories.length > 0 && (
            <div className="flex justify-center mb-14 animate-slide-up stagger-1">
              <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl glass-strong">
                <button
                  onClick={() => setActiveFilter('Semua')}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeFilter === 'Semua'
                      ? 'gradient-bg-animated text-white shadow-lg glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                  }`}
                >
                  Semua
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-md ${
                    activeFilter === 'Semua' ? 'bg-white/20' : 'bg-muted/40'
                  }`}>
                    {projects.length}
                  </span>
                </button>
                {availableCategories.map((cat) => {
                  const count = projects.filter((p) => p.category === cat).length
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        activeFilter === cat
                          ? 'gradient-bg-animated text-white shadow-lg glow'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                      }`}
                    >
                      {cat}
                      <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-md ${
                        activeFilter === cat ? 'bg-white/20' : 'bg-muted/40'
                      }`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-3xl border border-border/20 bg-card/20 overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted/20" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-muted/20 rounded-full w-2/3" />
                    <div className="h-4 bg-muted/20 rounded-full w-full" />
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-muted/20 rounded-full" />
                      <div className="h-5 w-16 bg-muted/20 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className={`animate-slide-up stagger-${Math.min(index + 1, 6)}`}>
                  <ProjectCard
                    project={project}
                    onClick={() => handleProjectClick(project)}
                  />
                </div>
              ))}
            </div>
          ) : projects.length > 0 && activeFilter !== 'Semua' ? (
            /* No projects matching filter */
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-3xl bg-muted/20 mx-auto mb-6 flex items-center justify-center">
                <Code2 className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-muted-foreground">
                Tidak ada proyek "{activeFilter}"
              </h3>
              <p className="text-muted-foreground/70 mb-6">
                Belum ada proyek dengan kategori ini.
              </p>
              <button
                onClick={() => setActiveFilter('Semua')}
                className="text-sm font-semibold gradient-text hover:opacity-80 transition-opacity"
              >
                ← Lihat Semua Proyek
              </button>
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="relative mx-auto mb-8">
                <div className="w-24 h-24 rounded-3xl gradient-bg-animated opacity-20 mx-auto flex items-center justify-center">
                  <Code2 className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 w-24 h-24 rounded-3xl mx-auto animate-ping gradient-bg opacity-5" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-muted-foreground">Belum ada proyek</h3>
              <p className="text-muted-foreground/70 max-w-md mx-auto">
                Proyek akan muncul di sini setelah dipublikasikan dari dashboard. Kelola portofolio Anda dengan mudah!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* === Contact Section === */}
      <section id="contact" className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 section-divider" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-red-400/5 blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6 gradient-border">
              Kontak
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
              Mari <span className="gradient-text">Berkolaborasi</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-14 leading-relaxed max-w-2xl mx-auto">
              Punya proyek menarik atau ingin bekerja sama? Jangan ragu untuk menghubungi saya.
              Saya selalu terbuka untuk diskusi dan peluang baru.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 animate-slide-up stagger-2">
            {[
              {
                href: 'mailto:hello@example.com',
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Email',
                subtitle: 'hello@example.com',
                gradient: 'from-blue-500 to-indigo-600',
              },
              {
                href: 'https://github.com',
                icon: (
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
                title: 'GitHub',
                subtitle: '@username',
                gradient: 'from-gray-600 to-gray-800',
              },
              {
                href: 'https://linkedin.com',
                icon: (
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
                title: 'LinkedIn',
                subtitle: 'in/username',
                gradient: 'from-blue-600 to-blue-800',
              },
            ].map((contact) => (
              <a
                key={contact.title}
                href={contact.href}
                target={contact.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group relative p-8 rounded-3xl border border-border/20 bg-card/20 backdrop-blur-sm hover-lift transition-all duration-500 hover:border-primary/20 overflow-hidden gradient-border"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  {contact.icon}
                </div>
                <h3 className="relative font-bold text-base mb-1">{contact.title}</h3>
                <p className="relative text-sm text-muted-foreground">{contact.subtitle}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* === Project Detail Modal === */}
      <ProjectDetailModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  )
}
