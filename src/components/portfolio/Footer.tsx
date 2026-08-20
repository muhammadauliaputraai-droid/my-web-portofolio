import { Sparkles, Mail, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/20 bg-card/20 backdrop-blur-sm">
      {/* Subtle gradient accent at top */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl gradient-bg-animated flex items-center justify-center shadow-md glow">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text tracking-tight">Portfolio</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Membangun solusi digital yang indah dan berdampak. Mari berkolaborasi untuk membuat sesuatu yang luar biasa.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="font-bold text-foreground">Navigasi</h4>
            <div className="flex flex-col gap-2.5">
              {['Beranda', 'Tentang', 'Proyek', 'Kontak'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const id = link === 'Beranda' ? 'hero' : link === 'Tentang' ? 'about' : link === 'Proyek' ? 'projects' : 'contact'
                    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left w-fit cursor-pointer group flex items-center gap-2"
                >
                  <span className="w-0 h-[2px] gradient-bg rounded-full group-hover:w-3 transition-all duration-300" />
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-5">
            <h4 className="font-bold text-foreground">Terhubung</h4>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com', icon: GithubIcon, label: 'GitHub' },
                { href: 'https://linkedin.com', icon: LinkedinIcon, label: 'LinkedIn' },
                { href: 'mailto:hello@example.com', icon: Mail, label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:bg-muted/20 transition-all duration-300 hover-lift group gradient-border"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-7 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Dibuat dengan <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400 animate-pulse" /> menggunakan React & Supabase
          </p>
        </div>
      </div>
    </footer>
  )
}
