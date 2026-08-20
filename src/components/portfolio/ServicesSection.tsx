import { Layout, Server, Sparkles, Smartphone, ArrowUpRight } from 'lucide-react'

export default function ServicesSection() {
  const services = [
    {
      icon: Layout,
      title: 'Frontend Web Development',
      description:
        'Membangun antarmuka web modern berbasis React & TypeScript yang cepat, modular, dan responsif di semua perangkat.',
      features: ['Single Page Applications (SPA)', 'Component Design Systems', 'Modern State Management', 'SEO & Core Web Vitals'],
      gradient: 'from-sky-500/15 to-blue-500/5',
      accentColor: 'text-sky-500 dark:text-sky-400',
    },
    {
      icon: Server,
      title: 'Backend & Database Architecture',
      description:
        'Merancang RESTful API, arsitektur basis data PostgreSQL/Supabase, otentikasi aman, serta sistem manajemen data realtime.',
      features: ['Supabase Integration & RLS', 'PostgreSQL Schema Design', 'Secure Auth & Authorization', 'Cloud Storage & File Management'],
      gradient: 'from-indigo-500/15 to-purple-500/5',
      accentColor: 'text-indigo-500 dark:text-indigo-400',
    },
    {
      icon: Sparkles,
      title: 'UI/UX Design & Prototyping',
      description:
        'Mentransformasikan konsep desain menjadi antarmuka interaktif yang memukau dengan micro-interactions yang halus.',
      features: ['Tailwind CSS & shadcn/ui', 'Figma to Clean Code', 'Dark & Light Mode Systems', 'Accessible UI Standards (a11y)'],
      gradient: 'from-rose-500/15 to-pink-500/5',
      accentColor: 'text-rose-500 dark:text-rose-400',
    },
    {
      icon: Smartphone,
      title: 'Optimasi & Deployment',
      description:
        'Optimalisasi performa loading, integrasi pipeline CI/CD, deployment cloud otomatis, dan pemeliharaan jangka panjang.',
      features: ['Automated Vercel Deployment', 'Performance Optimization', 'Clean Code Review', 'Troubleshooting & Maintenance'],
      gradient: 'from-cyan-500/15 to-emerald-500/5',
      accentColor: 'text-cyan-500 dark:text-cyan-400',
    },
  ]

  return (
    <section id="services" className="py-24 relative border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 gradient-border">
            Layanan & Solusi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Apa yang Bisa Saya <span className="gradient-text">Kerjakan</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Solusi digital komprehensif dari perancangan arsitektur hingga implementasi produksi siap pakai.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`p-7 sm:p-8 rounded-3xl glass border border-border/40 hover-lift transition-all duration-300 relative group overflow-hidden animate-slide-up stagger-${index + 1}`}
            >
              {/* Subtle background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-card border border-border/40 ${service.accentColor} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-border/30">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
