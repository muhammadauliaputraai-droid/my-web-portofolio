import { useEffect, useState } from 'react'
import Navbar from '@/components/portfolio/Navbar'
import HeroSection from '@/components/portfolio/HeroSection'
import ProjectCard from '@/components/portfolio/ProjectCard'
import Footer from '@/components/portfolio/Footer'
import { supabase, type Project } from '@/lib/supabase'
import { Code2, Palette, Zap, Users } from 'lucide-react'

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tentang <span className="gradient-text">Saya</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Seorang developer yang passionate dalam membangun aplikasi web modern.
              Saya percaya bahwa teknologi terbaik adalah yang tidak terlihat — yang hanya terasa bekerja dengan sempurna.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Code2,
                title: 'Clean Code',
                description: 'Menulis kode yang bersih, terstruktur, dan mudah dimaintenance.',
              },
              {
                icon: Palette,
                title: 'UI/UX Design',
                description: 'Menciptakan antarmuka yang indah dan intuitif untuk pengguna.',
              },
              {
                icon: Zap,
                title: 'Performance',
                description: 'Optimalisasi performa untuk pengalaman pengguna yang cepat.',
              },
              {
                icon: Users,
                title: 'Kolaborasi',
                description: 'Bekerja sama dengan tim untuk menghasilkan produk terbaik.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`group p-6 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm hover-lift transition-all duration-300 hover:border-primary/30 animate-slide-up stagger-${index + 1}`}
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Proyek <span className="gradient-text">Terbaru</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Beberapa proyek yang telah saya kerjakan. Setiap proyek merupakan
              kesempatan untuk belajar dan bertumbuh.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-border/30 bg-card/30 overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted/30" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted/30 rounded w-2/3" />
                    <div className="h-4 bg-muted/30 rounded w-full" />
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-muted/30 rounded-full" />
                      <div className="h-5 w-16 bg-muted/30 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={project.id} className={`animate-slide-up stagger-${Math.min(index + 1, 6)}`}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl gradient-bg opacity-20 mx-auto mb-6 flex items-center justify-center">
                <Code2 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-muted-foreground">Belum ada proyek</h3>
              <p className="text-muted-foreground/70">
                Proyek akan muncul di sini setelah dipublikasikan dari dashboard.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Mari <span className="gradient-text">Berkolaborasi</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Punya proyek menarik atau ingin bekerja sama? Jangan ragu untuk menghubungi saya.
              Saya selalu terbuka untuk diskusi dan peluang baru.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up stagger-2">
            <a
              href="mailto:hello@example.com"
              className="group p-6 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm hover-lift transition-all duration-300 hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm mb-1">Email</h3>
              <p className="text-xs text-muted-foreground">hello@example.com</p>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm hover-lift transition-all duration-300 hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm mb-1">GitHub</h3>
              <p className="text-xs text-muted-foreground">@username</p>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm hover-lift transition-all duration-300 hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm mb-1">LinkedIn</h3>
              <p className="text-xs text-muted-foreground">in/username</p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
