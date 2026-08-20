import { Sparkles, Mail, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-sm">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold gradient-text tracking-tight">Portfolio</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
              Membangun solusi digital yang indah dan berdampak. Mari berkolaborasi untuk membuat sesuatu yang luar biasa.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Navigasi</h4>
            <div className="flex flex-col gap-2">
              {['Beranda', 'Tentang', 'Proyek', 'Kontak'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const id = link === 'Beranda' ? 'hero' : link === 'Tentang' ? 'about' : link === 'Proyek' ? 'projects' : 'contact'
                    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors text-left w-fit cursor-pointer"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Terhubung</h4>
            <div className="flex gap-2.5">
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
                  className="p-2.5 rounded-xl glass hover:bg-muted/40 transition-colors border border-border/40 text-muted-foreground hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {currentYear} Portfolio. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan <Heart className="h-3 w-3 text-rose-400 fill-rose-400" /> menggunakan React & Supabase
          </p>
        </div>
      </div>
    </footer>
  )
}
