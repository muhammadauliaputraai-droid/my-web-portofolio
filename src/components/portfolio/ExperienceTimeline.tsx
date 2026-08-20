import { useState } from 'react'
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function ExperienceTimeline() {
  const [tab, setTab] = useState<'experience' | 'education'>('experience')

  const experiences = [
    {
      role: 'Full-Stack Web Developer',
      company: 'Freelance & Independent Projects',
      period: '2024 - Sekarang',
      location: 'Remote / Indonesia',
      description:
        'Merancang dan membangun aplikasi web interaktif, sistem manajemen konten, dashboard analitik, dan integrasi API modern menggunakan React, TypeScript, Next.js, dan Supabase.',
      highlights: [
        'Membangun aplikasi web full-stack dengan autentikasi aman dan integrasi database realtime.',
        'Mengoptimalkan arsitektur frontend dengan komponen modular dan desain responsif.',
        'Implementasi CI/CD dan automated deployment ke Vercel.',
      ],
      skills: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Next.js', 'PostgreSQL'],
    },
    {
      role: 'Frontend Developer',
      company: 'Web Application Projects',
      period: '2023 - 2024',
      location: 'Indonesia',
      description:
        'Fokus pada pembuatan antarmuka pengguna (UI) yang kaya estetika, performa loading kilat, dan integrasi RESTful APIs untuk berbagai kebutuhan klien.',
      highlights: [
        'Mengembangkan sistem UI/UX dengan standar aksesibilitas dan micro-interactions.',
        'Meningkatkan performa Lighthouse dan Core Web Vitals hingga skor 95+.',
      ],
      skills: ['JavaScript (ES6+)', 'React', 'Tailwind CSS', 'REST APIs', 'Git'],
    },
  ]

  const education = [
    {
      degree: 'Pendidikan Ilmu Komputer / Teknik Informatika',
      institution: 'Studi Akademik & Pengembangan Mandiri',
      period: '2021 - Sekarang',
      location: 'Indonesia',
      description:
        'Mempelajari struktur data, algoritma, rekayasa perangkat lunak, arsitektur basis data, dan pengembangan web modern.',
      highlights: [
        'Fokus pada Rekayasa Perangkat Lunak Berbasis Web.',
        'Penyelesaian berbagai kursus dan sertifikasi pengembangan full-stack.',
      ],
      skills: ['Software Engineering', 'Algorithms', 'Data Structures', 'Database Design'],
    },
  ]

  return (
    <section id="experience" className="py-24 relative border-t border-border/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 gradient-border">
            Perjalanan Karier
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Pengalaman & <span className="gradient-text">Edukasi</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Riwayat pengalaman kerja, proyek komersial, serta latar belakang pendidikan dan pengembangan keahlian.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-2xl glass-strong border border-border/40 gap-1">
            <button
              onClick={() => setTab('experience')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                tab === 'experience'
                  ? 'gradient-bg text-white shadow-md glow'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Pengalaman Kerja</span>
            </button>
            <button
              onClick={() => setTab('education')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                tab === 'education'
                  ? 'gradient-bg text-white shadow-md glow'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>Edukasi & Pelatihan</span>
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-primary/30 space-y-10">
          {(tab === 'experience' ? experiences : education).map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-background border-4 border-primary shadow-sm group-hover:scale-125 group-hover:border-accent transition-all duration-300" />

              {/* Timeline Card */}
              <div className="p-6 sm:p-7 rounded-2xl glass border border-border/40 hover-lift transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {'role' in item ? item.role : item.degree}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      {'company' in item ? item.company : item.institution}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted/40 border border-border/30">
                      <Calendar className="h-3 w-3 text-primary" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted/40 border border-border/30">
                      <MapPin className="h-3 w-3 text-accent" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-1.5 mb-4">
                  {item.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                  {item.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-[11px] font-medium bg-muted/50 border border-border/40 px-2.5 py-0.5 rounded-lg"
                    >
                      {skill}
                    </Badge>
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
