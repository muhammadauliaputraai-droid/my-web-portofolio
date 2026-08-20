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
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Menciptakan antarmuka yang indah, fungsional, dan intuitif.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimalisasi performa aplikasi untuk pengalaman yang cepat dan responsif.',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
    },
    {
      icon: Users,
      title: 'Kolaborasi',
      description: 'Bekerja sama secara efektif untuk menghasilkan solusi digital terbaik.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
  ]

  const techStack = [
    { icon: Terminal, name: 'React' },
    { icon: Layers, name: 'TypeScript' },
    { icon: Database, name: 'Supabase' },
    { icon: Globe, name: 'Next.js' },
    { icon: Palette, name: 'Tailwind CSS' },
    { icon: Code2, name: 'Node.js' },
  ]

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />

      {/* === Tech Stack Strip === */}
      <section className="py-6 relative border-y border-border/30 bg-card/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex items-center gap-2 text-muted-foreground/70 hover:text-foreground transition-colors">
                <tech.icon className="h-4 w-4 text-primary/80" />
                <span className="text-xs font-semibold uppercase tracking-wider">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === About Section === */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 border border-border/40">
              Keahlian
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Tentang <span className="gradient-text">Saya</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Passionate dalam merancang dan mengembangkan aplikasi web modern dengan fondasi kode yang kuat serta pengalaman visual yang elegan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((item, index) => (
              <div
                key={item.title}
                className={`p-6 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm hover-lift transition-all duration-200 animate-slide-up stagger-${index + 1}`}
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Projects Section === */}
      <section id="projects" className="py-24 relative border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 border border-border/40">
              Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Proyek <span className="gradient-text">Pilihan</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Koleksi karya dan proyek yang telah saya kembangkan.
            </p>
          </div>

          {/* === Category Filter Tabs === */}
          {!loading && projects.length > 0 && availableCategories.length > 0 && (
            <div className="flex justify-center mb-10 animate-slide-up stagger-1">
              <div className="inline-flex flex-wrap justify-center gap-1.5 p-1 rounded-xl glass border border-border/40">
                <button
                  onClick={() => setActiveFilter('Semua')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    activeFilter === 'Semua'
                      ? 'gradient-bg text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  Semua
                  <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-md ${
                    activeFilter === 'Semua' ? 'bg-white/20' : 'bg-muted/50'
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
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        activeFilter === cat
                          ? 'gradient-bg text-white shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      }`}
                    >
                      {cat}
                      <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-md ${
                        activeFilter === cat ? 'bg-white/20' : 'bg-muted/50'
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
                <div key={i} className="rounded-2xl border border-border/40 bg-card/30 overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted/20" />
                  <div className="p-5 space-y-3">
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
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-muted/20 mx-auto mb-4 flex items-center justify-center">
                <Code2 className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-muted-foreground">
                Tidak ada proyek "{activeFilter}"
              </h3>
              <p className="text-sm text-muted-foreground/70 mb-4">
                Belum ada proyek dengan kategori ini.
              </p>
              <button
                onClick={() => setActiveFilter('Semua')}
                className="text-xs font-semibold text-primary hover:underline"
              >
                ← Lihat Semua Proyek
              </button>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-4 flex items-center justify-center text-primary">
                <Code2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-muted-foreground">Belum ada proyek</h3>
              <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
                Proyek akan muncul di sini setelah dipublikasikan melalui dashboard.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* === Contact Section === */}
      <section id="contact" className="py-24 relative border-t border-border/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 border border-border/40">
              Kontak
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Mari <span className="gradient-text">Berkolaborasi</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              Tertarik untuk bekerja sama atau mendiskusikan peluang baru? Jangan ragu untuk menghubungi saya.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up stagger-2">
            {[
              {
                href: 'mailto:hello@example.com',
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Email',
                subtitle: 'hello@example.com',
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
              },
              {
                href: 'https://github.com',
                icon: (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
                title: 'GitHub',
                subtitle: '@username',
                color: 'text-purple-400',
                bg: 'bg-purple-500/10',
              },
              {
                href: 'https://linkedin.com',
                icon: (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
                title: 'LinkedIn',
                subtitle: 'in/username',
                color: 'text-rose-400',
                bg: 'bg-rose-500/10',
              },
            ].map((contact) => (
              <a
                key={contact.title}
                href={contact.href}
                target={contact.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="p-6 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm hover-lift transition-all duration-200 text-center"
              >
                <div className={`w-12 h-12 rounded-xl ${contact.bg} ${contact.color} flex items-center justify-center mx-auto mb-3`}>
                  {contact.icon}
                </div>
                <h3 className="font-bold text-sm mb-1">{contact.title}</h3>
                <p className="text-xs text-muted-foreground">{contact.subtitle}</p>
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
