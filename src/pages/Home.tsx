import { useEffect, useState, useMemo } from 'react'
import Navbar from '@/components/portfolio/Navbar'
import HeroSection from '@/components/portfolio/HeroSection'
import StatsStrip from '@/components/portfolio/StatsStrip'
import ServicesSection from '@/components/portfolio/ServicesSection'
import ExperienceTimeline from '@/components/portfolio/ExperienceTimeline'
import ProjectCard from '@/components/portfolio/ProjectCard'
import ProjectDetailModal from '@/components/portfolio/ProjectDetailModal'
import ContactSection from '@/components/portfolio/ContactSection'
import Footer from '@/components/portfolio/Footer'
import SpotlightCursor from '@/components/ui/spotlight-cursor'
import { supabase, PROJECT_CATEGORIES, type Project, type ProjectCategory } from '@/lib/supabase'
import { Code2, Palette, Zap, Users, Terminal, Layers, Database, Globe, CheckCircle2 } from 'lucide-react'

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
      title: 'Clean Architecture',
      description: 'Menulis kode yang bersih, terstruktur, type-safe, dan mudah dirawat dalam jangka panjang.',
      features: ['TypeScript strict typing', 'Modular components', 'Design patterns'],
      color: 'text-sky-500 dark:text-sky-400',
      bg: 'bg-sky-500/10',
    },
    {
      icon: Palette,
      title: 'Modern UI/UX Design',
      description: 'Menciptakan antarmuka yang indah, fungsional, dan ramah pengguna di semua ukuran layar.',
      features: ['Glassmorphism & dark mode', 'Accessible components', 'Micro-interactions'],
      color: 'text-indigo-500 dark:text-indigo-400',
      bg: 'bg-indigo-500/10',
    },
    {
      icon: Zap,
      title: 'Performa & Kecepatan',
      description: 'Optimalisasi waktu muat aplikasi, caching pintar, dan efisiensi query basis data.',
      features: ['Lighthouse 95+ score', 'Code-splitting & lazy load', 'SEO optimized'],
      color: 'text-rose-500 dark:text-rose-400',
      bg: 'bg-rose-500/10',
    },
    {
      icon: Users,
      title: 'Kolaborasi & Workflow',
      description: 'Bekerja sama secara efektif menggunakan Git, Agile mindset, dan CI/CD automation.',
      features: ['Git version control', 'Automated deployments', 'Clear documentation'],
      color: 'text-cyan-500 dark:text-cyan-400',
      bg: 'bg-cyan-500/10',
    },
  ]

  const techStack = [
    { icon: Terminal, name: 'React 19' },
    { icon: Layers, name: 'TypeScript' },
    { icon: Database, name: 'Supabase' },
    { icon: Globe, name: 'Next.js' },
    { icon: Palette, name: 'Tailwind CSS' },
    { icon: Code2, name: 'Node.js' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative selection:bg-primary/20 selection:text-primary">
      {/* Background Spotlight Cursor */}
      <SpotlightCursor />

      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Strip */}
      <StatsStrip />

      {/* === Tech Stack Strip === */}
      <section className="py-8 mt-12 relative border-y border-border/30 bg-card/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 text-muted-foreground/70 hover:text-foreground transition-colors group cursor-default"
              >
                <tech.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 gradient-border">
              Keahlian Inti
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Fondasi & <span className="gradient-text">Prinsip Kerja</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Mengutamakan keseimbangan antara keindahan visual, stabilitas kode, dan performa tinggi dalam setiap baris kode yang ditulis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((item, index) => (
              <div
                key={item.title}
                className={`p-7 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-sm hover-lift transition-all duration-200 animate-slide-up stagger-${index + 1} flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-5 shadow-sm`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-base mb-2 text-foreground">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-border/30">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Experience & Education Timeline */}
      <ExperienceTimeline />

      {/* === Projects Section === */}
      <section id="projects" className="py-24 relative border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 gradient-border">
              Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Proyek <span className="gradient-text">Pilihan</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Koleksi karya dan aplikasi yang telah saya kembangkan. Klik kartu proyek untuk melihat detail lengkap.
            </p>
          </div>

          {/* === Category Filter Tabs === */}
          {!loading && projects.length > 0 && availableCategories.length > 0 && (
            <div className="flex justify-center mb-10 animate-slide-up stagger-1">
              <div className="inline-flex flex-wrap justify-center gap-1.5 p-1 rounded-2xl glass gradient-border">
                <button
                  onClick={() => setActiveFilter('Semua')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    activeFilter === 'Semua'
                      ? 'gradient-bg text-white shadow-sm glow'
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
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        activeFilter === cat
                          ? 'gradient-bg text-white shadow-sm glow'
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
                <div key={i} className="rounded-3xl border border-border/40 bg-card/30 overflow-hidden animate-pulse">
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

      {/* Contact Section with Live Form */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  )
}
