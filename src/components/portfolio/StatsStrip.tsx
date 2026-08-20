import { Code2, FolderCheck, Sparkles, Trophy } from 'lucide-react'

export default function StatsStrip() {
  const stats = [
    {
      icon: FolderCheck,
      value: '100%',
      label: 'Komitmen Kualitas',
      subtext: 'Clean code & best practices',
    },
    {
      icon: Code2,
      value: 'Modern',
      label: 'Tech Stack',
      subtext: 'React 19 & TypeScript',
    },
    {
      icon: Trophy,
      value: 'Responsive',
      label: 'Desain Multi-Device',
      subtext: 'Mobile, Tablet & Desktop',
    },
    {
      icon: Sparkles,
      value: 'Fast',
      label: 'Performa Optimal',
      subtext: 'Lightweight & SEO-ready',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 -mt-6 sm:-mt-10 relative z-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-5 rounded-3xl glass-strong border border-border/50 shadow-xl">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-4 sm:p-5 rounded-2xl bg-card/40 hover:bg-card/70 border border-border/30 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <stat.icon className="h-5 w-5" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold gradient-text tracking-tight mb-0.5">
              {stat.value}
            </span>
            <span className="text-xs sm:text-sm font-bold text-foreground">
              {stat.label}
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5 hidden sm:block">
              {stat.subtext}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
