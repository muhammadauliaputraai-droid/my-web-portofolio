import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Sidebar from '@/components/dashboard/Sidebar'
import StatsCards from '@/components/dashboard/StatsCards'
import ProjectsManager from '@/components/dashboard/ProjectsManager'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Menu, Plus, RefreshCw, Sparkles, FolderGit2, ArrowRight } from 'lucide-react'
import { supabase, type Project } from '@/lib/supabase'
import ProjectForm from '@/components/dashboard/ProjectForm'

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'projects'>('overview')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [quickFormOpen, setQuickFormOpen] = useState(false)

  const fetchProjects = useCallback(async () => {
    setRefreshing(true)
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setProjects(data as Project[])
      }
    } catch (err) {
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const recentProjects = projects.slice(0, 4)

  return (
    <div className="dark min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main content area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-card/60 backdrop-blur-xl border-b border-border/40 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 text-muted-foreground"
              aria-label="Buka menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground capitalize">
                {activeTab === 'overview' ? 'Ringkasan Dashboard' : 'Kelola Manajemen Proyek'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchProjects}
              disabled={refreshing}
              className="h-9 px-3 border-border/40 text-xs gap-1.5"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setQuickFormOpen(true)}
              className="h-9 gradient-bg text-white hover:opacity-90 text-xs font-semibold gap-1.5 shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Proyek</span>
            </Button>
          </div>
        </header>

        {/* Body content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 gradient-bg-animated border border-primary/20 shadow-xl">
            <div className="relative z-10 max-w-xl text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Panel Kontrol Portofolio</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight">
                Halo, {user?.email?.split('@')[0] ?? 'Admin'}! 👋
              </h1>
              <p className="text-sm text-white/90 leading-relaxed mb-4">
                Kelola proyek karya terbaik Anda. Semua perubahan akan langsung terhubung ke
                tampilan portofolio publik.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <Button
                  size="sm"
                  onClick={() => setActiveTab('projects')}
                  className="bg-white text-slate-900 hover:bg-white/90 font-semibold shadow-md text-xs"
                >
                  Kelola Semua Proyek <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open('/', '_blank')}
                  className="bg-black/20 hover:bg-black/30 text-white border-white/30 text-xs"
                >
                  Lihat Web Publik
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Statistik Proyek
            </h3>
            <StatsCards projects={projects} />
          </div>

          {/* Tab Views */}
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Proyek Terbaru</h3>
                  <p className="text-xs text-muted-foreground">
                    Daftar 4 proyek terakhir yang diperbarui
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('projects')}
                  className="text-primary hover:text-primary/90 text-xs font-semibold"
                >
                  Lihat Semua ({projects.length})
                </Button>
              </div>

              {recentProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="bg-card/50 backdrop-blur-sm border-border/40 hover-lift overflow-hidden"
                    >
                      <div className="p-5 flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted/40 border border-border/30 shrink-0 flex items-center justify-center">
                          {project.image_url ? (
                            <img
                              src={project.image_url}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FolderGit2 className="h-6 w-6 text-muted-foreground/60" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-sm truncate text-foreground">
                              {project.title}
                            </h4>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                project.status === 'published'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-amber-500/20 text-amber-400'
                              }`}
                            >
                              {project.status === 'published' ? 'Publik' : 'Draft'}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {project.description || 'Tidak ada deskripsi'}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.tech_stack?.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-card/30 border-border/30 p-8 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Belum ada proyek yang ditambahkan.
                  </p>
                  <Button
                    onClick={() => setQuickFormOpen(true)}
                    className="gradient-bg text-white hover:opacity-90 text-xs"
                  >
                    <Plus className="mr-1.5 h-4 w-4" /> Tambah Proyek Pertama
                  </Button>
                </Card>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Daftar Semua Proyek</h3>
                <p className="text-xs text-muted-foreground">
                  Tambah, edit, hapus, atau atur visibilitas proyek Anda
                </p>
              </div>
              <ProjectsManager
                projects={projects}
                loading={loading}
                onRefresh={fetchProjects}
              />
            </div>
          )}
        </main>
      </div>

      {/* Global Quick Add Form Modal */}
      <ProjectForm
        open={quickFormOpen}
        onOpenChange={setQuickFormOpen}
        projectToEdit={null}
        onSuccess={fetchProjects}
      />
    </div>
  )
}
