import { Button } from '@/components/ui/button'
import { ArrowDown, Mail, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

export default function HeroSection() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* === Light Blue + Pastel Red Ambient Lighting === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Sky Blue Glow (Top Left) */}
        <div className="absolute top-[-5%] left-[-5%] w-[480px] h-[480px] rounded-full bg-sky-400/15 blur-[130px] dark:bg-sky-500/20" />
        {/* Soft Pastel Red Glow (Bottom Right) */}
        <div className="absolute bottom-[-5%] right-[-5%] w-[480px] h-[480px] rounded-full bg-rose-400/15 blur-[140px] dark:bg-rose-500/20" />
        {/* Center fusion glow */}
        <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] rounded-full bg-cyan-400/8 blur-[120px] dark:bg-cyan-500/10" />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* === Content === */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass gradient-border mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">Tersedia untuk Kolaborasi</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.15] mb-6 animate-slide-up tracking-tight">
          <span className="text-foreground">Hai, Saya</span>{' '}
          <span className="gradient-text">Full-Stack Developer</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up stagger-2">
          Membangun aplikasi web modern dengan fokus pada performa tinggi, perpaduan visual yang estetis,
          serta pengalaman pengguna yang intuitif menggunakan React & TypeScript.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up stagger-3">
          <Button
            size="lg"
            className="gradient-bg text-white hover:opacity-90 shadow-md hover:shadow-lg transition-all duration-300 px-8 py-6 text-base font-semibold rounded-xl glow"
            onClick={scrollToProjects}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Lihat Karya Saya
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/60 hover:bg-muted/40 px-8 py-6 text-base font-semibold backdrop-blur-sm rounded-xl gradient-border"
            onClick={scrollToContact}
          >
            Hubungi Saya
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 animate-slide-up stagger-4">
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
              className="p-3 rounded-xl glass hover:bg-muted/40 transition-all duration-200 hover-lift group border border-border/40"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={scrollToProjects}
            className="p-2 rounded-full glass hover:bg-muted/40 transition-colors group"
            aria-label="Scroll ke bawah"
          >
            <ArrowDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </section>
  )
}
