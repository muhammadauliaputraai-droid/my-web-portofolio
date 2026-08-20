import { Button } from '@/components/ui/button'
import { ArrowDown, Mail } from 'lucide-react'
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float stagger-3" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/30 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">Open to Collaborate</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
          <span className="text-foreground">Hai, Saya </span>
          <br />
          <span className="gradient-text text-6xl sm:text-7xl lg:text-8xl">Developer</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up stagger-2">
          Membangun pengalaman web modern yang indah dan fungsional.
          Fokus pada <span className="text-foreground font-medium">React</span>,{' '}
          <span className="text-foreground font-medium">TypeScript</span>, dan{' '}
          <span className="text-foreground font-medium">UI/UX</span> yang memukau.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up stagger-3">
          <Button
            size="lg"
            className="gradient-bg text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 px-8 text-base font-semibold"
            onClick={scrollToProjects}
          >
            Lihat Karya Saya
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/50 hover:bg-muted/50 px-8 text-base font-semibold backdrop-blur-sm"
            onClick={scrollToContact}
          >
            Hubungi Saya
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 animate-slide-up stagger-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass hover:bg-muted/50 transition-all duration-200 hover-lift group"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass hover:bg-muted/50 transition-all duration-200 hover-lift group"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
          <a
            href="mailto:hello@example.com"
            className="p-3 rounded-xl glass hover:bg-muted/50 transition-all duration-200 hover-lift group"
            aria-label="Send Email"
          >
            <Mail className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToProjects}
            className="p-2 rounded-full glass hover:bg-muted/50 transition-colors"
            aria-label="Scroll ke bawah"
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </section>
  )
}
