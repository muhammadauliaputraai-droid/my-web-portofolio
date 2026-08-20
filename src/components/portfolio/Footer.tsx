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
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">Portfolio</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Membangun solusi digital yang indah dan berdampak. Mari berkolaborasi untuk membuat sesuatu yang luar biasa.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Navigasi</h4>
            <div className="flex flex-col gap-2">
              {['Beranda', 'Tentang', 'Proyek', 'Kontak'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const id = link === 'Beranda' ? 'hero' : link === 'Tentang' ? 'about' : link === 'Proyek' ? 'projects' : 'contact'
                    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left w-fit cursor-pointer"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Terhubung</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass hover:bg-muted/50 transition-all duration-200 hover-lift group"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass hover:bg-muted/50 transition-all duration-200 hover-lift group"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
              <a
                href="mailto:hello@example.com"
                className="p-2.5 rounded-xl glass hover:bg-muted/50 transition-all duration-200 hover-lift group"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Dibuat dengan <Heart className="h-3.5 w-3.5 text-accent fill-accent" /> menggunakan React & Supabase
          </p>
        </div>
      </div>
    </footer>
  )
}
