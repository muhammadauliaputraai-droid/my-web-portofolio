import { Card, CardContent } from '@/components/ui/card'
import { FolderGit2, CheckCircle2, FileEdit, Star } from 'lucide-react'
import type { Project } from '@/lib/supabase'

type StatsCardsProps = {
  projects: Project[]
}

export default function StatsCards({ projects }: StatsCardsProps) {
  const total = projects.length
  const published = projects.filter((p) => p.status === 'published').length
  const draft = projects.filter((p) => p.status === 'draft').length
  const featured = projects.filter((p) => p.is_featured).length

  const stats = [
    {
      title: 'Total Proyek',
      value: total,
      description: 'Semua proyek terdaftar',
      icon: FolderGit2,
      color: 'from-blue-500/20 to-indigo-500/20 text-indigo-400',
      border: 'border-indigo-500/20',
    },
    {
      title: 'Dipublikasikan',
      value: published,
      description: 'Tampil di web publik',
      icon: CheckCircle2,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
      border: 'border-emerald-500/20',
    },
    {
      title: 'Draft',
      value: draft,
      description: 'Belum dipublikasikan',
      icon: FileEdit,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400',
      border: 'border-amber-500/20',
    },
    {
      title: 'Unggulan (Featured)',
      value: featured,
      description: 'Highlight di beranda',
      icon: Star,
      color: 'from-pink-500/20 to-rose-500/20 text-pink-400',
      border: 'border-pink-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card
          key={stat.title}
          className={`relative overflow-hidden bg-card/60 backdrop-blur-sm border ${stat.border} hover-lift transition-all animate-slide-up stagger-${i + 1}`}
        >
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                {stat.title}
              </p>
              <h3 className="text-3xl font-extrabold text-foreground mb-1 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs text-muted-foreground/80">{stat.description}</p>
            </div>
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-inner`}
            >
              <stat.icon className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
