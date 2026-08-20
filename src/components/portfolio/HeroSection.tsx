import { Button } from '@/components/ui/button'
import { ArrowDown, Mail, Rocket, Code2, Layers } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import CodeTerminal from '@/components/portfolio/CodeTerminal'

export default function HeroSection() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* === Light Blue + Pastel Red Ambient Lighting === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Sky Blue Glow (Top Left) */}
        <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] rounded-full bg-sky-400/15 blur-[140px] dark:bg-sky-500/20" />
        {/* Soft Pastel Red Glow (Bottom Right) */}
        <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-rose-400/15 blur-[140px] dark:bg-rose-500/20" />
        {/* Center ambient glow */}
        <div className="absolute top-[35%] left-[30%] w-[380px] h-[380px] rounded-full bg-cyan-400/8 blur-[120px] dark:bg-cyan-500/10" />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Floating decorative tech pills */}
      <div className="hidden lg:block absolute left-8 top-1/3 p-2.5 rounded-2xl glass border border-border/40 text-xs font-semibold text-muted-foreground animate-[fade-in_0.6s_ease-out] hover-lift">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-sky-500" />
          <span>TypeScript & React</span>
        </div>
      </div>
      <div className="hidden lg:block absolute right-8 top-1/3 p-2.5 rounded-2xl glass border border-border/40 text-xs font-semibold text-muted-foreground animate-[fade-in_0.8s_ease-out] hover-lift">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-rose-500" />
          <span>Supabase & PostgreSQL</span>
        </div>
      </div>

      {/* === Content Container === */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center w-full">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass gradient-border mb-8 animate-fade-in shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">Tersedia untuk Kolaborasi & Proyek Baru</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.15] mb-4 animate-slide-up tracking-tight">
          <span className="text-foreground">Hai, Saya</span>{' '}
          <span className="gradient-text">Muhammad Aulia Putra</span>
        </h1>

        <p className="text-base sm:text-xl font-semibold text-foreground/90 mb-4 animate-slide-up stagger-1">
          Full-Stack Web Developer & UI/UX Enthusiast
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-up stagger-2">
          Membangun aplikasi web modern berkinerja tinggi dengan fondasi kode bersih,
          arsitektur modular, dan desain antarmuka yang intuitif.
        </p>

        {/* CTA Buttons with rich micro-interactions */}
        <div className="flex flex-wrap justify-center gap-3.5 mb-10 animate-slide-up stagger-3">
          <Button
            size="lg"
            className="btn-shimmer gradient-bg text-white hover:opacity-95 shadow-md hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 px-8 py-5 text-sm font-bold rounded-xl glow group active:scale-95"
            onClick={scrollToProjects}
          >
            <Rocket className="mr-2 h-4 w-4 text-white group-hover:scale-125 group-hover:-translate-y-0.5 transition-transform duration-300" />
            <span>Jelajahi Karya Saya</span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/60 hover:bg-muted/40 px-8 py-5 text-sm font-bold backdrop-blur-sm rounded-xl gradient-border group hover:border-primary/50 transition-all duration-300 active:scale-95"
            onClick={scrollToContact}
          >
            <Mail className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            <span>Hubungi Saya</span>
          </Button>
        </div>

        {/* Social Quick Links */}
        <div className="flex justify-center gap-2.5 mb-12 animate-slide-up stagger-4">
          {[
            { href: 'https://github.com/muhammadauliaputraai-droid', icon: GithubIcon, label: 'GitHub' },
            { href: 'https://linkedin.com/in/muhammadauliaputra', icon: LinkedinIcon, label: 'LinkedIn' },
            { href: 'mailto:muhammadauliaputra@gmail.com', icon: Mail, label: 'Email' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass hover:bg-muted/40 transition-all duration-200 hover-lift group border border-border/40"
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>

        {/* Interactive Code Terminal Preview */}
        <div className="animate-slide-up stagger-5 mb-8">
          <CodeTerminal />
        </div>

        {/* Scroll Indicator */}
        <div className="pt-4 animate-bounce">
          <button
            onClick={scrollToProjects}
            className="p-2 rounded-full glass hover:bg-muted/40 transition-colors group cursor-pointer"
            aria-label="Scroll ke bawah"
          >
            <ArrowDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </section>
  )
}
