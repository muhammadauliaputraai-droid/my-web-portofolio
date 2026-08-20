import { User, MapPin, Mail, Globe, BadgeCheck, CheckCircle2, Briefcase, GraduationCap, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

export default function BioSection() {
  const bioDetails = [
    { label: 'Nama Lengkap', value: 'Muhammad Aulia Putra', icon: User },
    { label: 'Profesi', value: 'Full-Stack Web Developer', icon: Briefcase },
    { label: 'Domisili', value: 'Indonesia (WIB / UTC+7)', icon: MapPin },
    { label: 'Status Kerja', value: 'Tersedia (Freelance & Full-time)', icon: CheckCircle2 },
    { label: 'Pendidikan', value: 'Ilmu Komputer / Informatika', icon: GraduationCap },
    { label: 'Bahasa', value: 'Indonesia (Native), English (Professional)', icon: Globe },
  ]

  const passions = [
    'Pengembangan Web Full-Stack',
    'Arsitektur Basis Data & Realtime',
    'Desain Antarmuka UI/UX Modern',
    'Optimasi Performa & Clean Code',
  ]

  return (
    <section id="bio" className="py-24 relative border-t border-border/30">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-sky-500/10 blur-[130px] dark:bg-sky-500/15" />
        <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-rose-500/10 blur-[140px] dark:bg-rose-500/15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 gradient-border">
            Profil Pribadi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Mengenal <span className="gradient-text">Muhammad Aulia Putra</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Developer di balik pembuatan website ini. Dedikasi tinggi dalam menciptakan aplikasi web yang elegan, cepat, dan fungsional.
          </p>
        </div>

        {/* Bio Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Avatar Profile & Quick Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl glass-strong border border-border/40 shadow-xl text-center relative overflow-hidden">
              {/* Decorative gradient top bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 gradient-bg" />

              {/* Avatar Frame with Gradient Border & Glow */}
              <div className="relative w-36 h-36 mx-auto mb-6">
                <div className="w-full h-full rounded-3xl p-1 gradient-bg shadow-lg glow">
                  <div className="w-full h-full rounded-[22px] bg-card flex items-center justify-center overflow-hidden">
                    {/* Stylized monogram avatar */}
                    <div className="w-full h-full bg-gradient-to-br from-sky-500/20 via-primary/10 to-rose-500/20 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black gradient-text tracking-wider">AP</span>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Developer</span>
                    </div>
                  </div>
                </div>
                {/* Active status bubble */}
                <div className="absolute bottom-1 right-1 p-1 rounded-full bg-background shadow-md">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-foreground mb-1">
                Muhammad Aulia Putra
              </h3>
              <p className="text-sm font-semibold gradient-text mb-4">
                Full-Stack Web Developer & UI/UX Enthusiast
              </p>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                "Menggabungkan estetika visual modern dengan logika arsitektur backend yang kokoh untuk membangun pengalaman digital yang bermakna."
              </p>

              {/* Social Channels */}
              <div className="flex justify-center gap-2.5 pt-4 border-t border-border/30">
                <a
                  href="https://github.com/muhammadauliaputraai-droid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl glass hover:bg-muted/40 border border-border/40 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub Profile"
                  title="GitHub: @muhammadauliaputraai-droid"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com/in/muhammadauliaputra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl glass hover:bg-muted/40 border border-border/40 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href="mailto:muhammadauliaputra.ai@gmail.com"
                  className="p-2.5 rounded-xl glass hover:bg-muted/40 border border-border/40 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Send Email"
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Biodata & Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Structured Info Card */}
            <div className="p-7 sm:p-8 rounded-3xl glass border border-border/40 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Informasi Biodata</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bioDetails.map((item, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-2xl bg-card/60 border border-border/30 hover:border-primary/30 transition-all flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                        {item.label}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-foreground truncate block">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Focus & Passions */}
              <div className="pt-4 border-t border-border/30">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-3">
                  Fokus & Minat Utama
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {passions.map((passion, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs font-medium text-foreground/90">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{passion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons with micro-interactions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border/30">
                <Button
                  onClick={() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="btn-shimmer gradient-bg text-white hover:opacity-95 font-bold rounded-xl text-xs sm:text-sm gap-2 glow group shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  <Mail className="h-4 w-4 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>Hubungi Muhammad</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="border-border/60 hover:bg-muted/40 font-bold rounded-xl text-xs sm:text-sm gap-2 gradient-border group hover:border-primary/40 transition-all duration-200 active:scale-95"
                >
                  <Code2 className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Lihat Hasil Karya</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
