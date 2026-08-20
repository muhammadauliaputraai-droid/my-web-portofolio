import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ui/theme-toggle'

const navLinks = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Profil', href: '#bio' },
  { label: 'Keahlian', href: '#about' },
  { label: 'Layanan', href: '#services' },
  { label: 'Pengalaman', href: '#experience' },
  { label: 'Karya', href: '#projects' },
  { label: 'Kontak', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { session } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-strong shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('#hero')}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-sm group-hover:opacity-90 transition-opacity">
            <span className="text-xs font-black text-white tracking-wider">AP</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
                Aulia<span className="gradient-text">.dev</span>
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium block -mt-1 hidden sm:block">
              Muhammad Aulia Putra
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          {/* Theme Toggle & Optional Session Workspace Button */}
          <div className="ml-2 flex items-center gap-2 pl-3 border-l border-border/40">
            <ThemeToggle />
            {session && (
              <Button
                size="sm"
                className="gradient-bg text-white hover:opacity-90 shadow-sm rounded-lg text-xs font-semibold px-4"
                onClick={() => navigate('/dashboard')}
              >
                Workspace
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg hover:bg-muted/30 transition-colors text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/30 animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/30 transition-colors"
              >
                {link.label}
              </button>
            ))}
            {session && (
              <div className="pt-3 border-t border-border/30">
                <Button
                  className="w-full gradient-bg text-white hover:opacity-90 rounded-lg text-xs font-semibold"
                  onClick={() => {
                    setMobileOpen(false)
                    navigate('/dashboard')
                  }}
                >
                  Buka Workspace
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
