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
      {/* === Rich Animated Background === */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[120px] animate-float" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[140px] animate-float-slow" />
        <div className="absolute bottom-[-15%] left-[20%] w-[550px] h-[550px] rounded-full bg-red-400/12 blur-[130px] animate-float stagger-4" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/8 blur-[100px] animate-breathe" />

        {/* Orbiting particles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit">
            <div className="w-2 h-2 rounded-full bg-blue-400/60 shadow-[0_0_8px_hsl(220_90%_60%/0.4)]" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '7s' }}>
          <div className="animate-orbit" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-red-400/50 shadow-[0_0_6px_hsl(350_80%_60%/0.3)]" />
          </div>
        </div>

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Top-right gradient accent line */}
        <div className="absolute top-0 right-0 w-[600px] h-[2px] bg-gradient-to-l from-blue-500/40 via-purple-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[2px] bg-gradient-to-r from-red-400/40 via-purple-500/20 to-transparent" />
      </div>

      {/* === Noise texture overlay === */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* === Content === */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass gradient-border mb-10 animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-muted-foreground">Tersedia untuk Kolaborasi</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[1.1] mb-8 animate-slide-up tracking-tight">
          <span className="text-foreground">Hai, Saya</span>
          <br />
          <span className="gradient-text inline-block mt-2">Full-Stack</span>
          <br />
          <span className="gradient-text inline-block">Developer</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up stagger-2">
          Membangun pengalaman digital yang{' '}
          <span className="text-foreground font-semibold relative">
            modern
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] gradient-bg rounded-full" />
          </span>
          {', '}
          <span className="text-foreground font-semibold relative">
            indah
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] gradient-bg rounded-full" />
          </span>
          {', dan '}
          <span className="text-foreground font-semibold relative">
            fungsional
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] gradient-bg rounded-full" />
          </span>
          . Fokus pada React, TypeScript, dan desain UI/UX yang memukau.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-14 animate-slide-up stagger-3">
          <Button
            size="lg"
            className="gradient-bg-animated text-white hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-500 px-10 py-6 text-base font-bold rounded-2xl glow group"
            onClick={scrollToProjects}
          >
            <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            Lihat Karya Saya
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/40 hover:bg-muted/30 px-10 py-6 text-base font-bold backdrop-blur-sm rounded-2xl gradient-border hover-glow"
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
              className="p-3.5 rounded-2xl glass hover:bg-muted/30 transition-all duration-300 hover-lift group gradient-border"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToProjects}
            className="p-2.5 rounded-full glass hover:bg-muted/30 transition-all duration-300 group"
            aria-label="Scroll ke bawah"
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>
      </div>
    </section>
  )
}
