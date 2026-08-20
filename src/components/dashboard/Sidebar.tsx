import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  LayoutDashboard,
  FolderGit2,
  ExternalLink,
  LogOut,
  X,
} from 'lucide-react'

type SidebarProps = {
  activeTab: 'overview' | 'projects'
  setActiveTab: (tab: 'overview' | 'projects') => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U'

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-card/80 backdrop-blur-xl border-r border-border/40 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top section */}
        <div>
          {/* Logo & header */}
          <div className="p-6 border-b border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-md">
                <span className="text-xs font-black text-white tracking-wider">AP</span>
              </div>
              <div>
                <h1 className="font-extrabold text-sm text-foreground">
                  Aulia<span className="gradient-text">.dev</span>
                </h1>
                <p className="text-[11px] text-muted-foreground font-medium">Developer Workspace</p>
              </div>
            </div>
            {/* Mobile close */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8 text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1.5">
            <button
              onClick={() => {
                setActiveTab('overview')
                setMobileOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'overview'
                  ? 'gradient-bg text-white shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Ringkasan
            </button>

            <button
              onClick={() => {
                setActiveTab('projects')
                setMobileOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'projects'
                  ? 'gradient-bg text-white shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              <FolderGit2 className="h-4 w-4" />
              Manajemen Proyek
            </button>

            <div className="pt-4 pb-1">
              <p className="px-3.5 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
                Eksternal
              </p>
            </div>

            <button
              onClick={() => {
                window.open('/', '_blank')
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <span className="flex items-center gap-3">
                <ExternalLink className="h-4 w-4" />
                Lihat Web Publik
              </span>
            </button>
          </div>
        </div>

        {/* User profile & Logout */}
        <div className="p-4 border-t border-border/30 space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-muted/30 border border-border/30">
            <Avatar className="h-9 w-9 border border-primary/30">
              <AvatarFallback className="gradient-bg text-white text-xs font-bold">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate text-foreground">
                {user?.email ?? 'Admin'}
              </p>
              <p className="text-[10px] text-muted-foreground">Admin Portofolio</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </Button>
        </div>
      </aside>
    </>
  )
}
