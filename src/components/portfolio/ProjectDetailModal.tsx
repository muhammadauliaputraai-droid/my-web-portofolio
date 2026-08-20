import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ExternalLink, Calendar, Tag, Layers, X } from 'lucide-react'
import { GithubIcon } from '@/components/ui/icons'
import type { Project } from '@/lib/supabase'

type ProjectDetailModalProps = {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  if (!project) return null

  const formattedDate = new Date(project.created_at).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-border/30 rounded-3xl gap-0">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl glass hover:bg-muted/30 transition-all text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-video overflow-hidden bg-muted/20">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full gradient-bg-animated opacity-20 flex items-center justify-center">
              <span className="text-7xl font-black text-white/15">{project.title.charAt(0)}</span>
            </div>
          )}
          {/* Gradient overlay on bottom of image */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card/95 to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex gap-2">
            {project.is_featured && (
              <Badge className="gradient-bg-animated text-white border-0 shadow-xl text-[10px] font-bold px-3 py-1 rounded-full">
                ★ Featured
              </Badge>
            )}
            {project.category && (
              <Badge variant="secondary" className="glass text-foreground text-[10px] font-bold px-3 py-1 rounded-full border-0">
                {project.category}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 -mt-8 relative z-10">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 gradient-text inline-block">
            {project.title}
          </h2>

          {/* Meta info row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
            {project.category && (
              <div className="flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" />
                <span>{project.category}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>{project.tech_stack?.length || 0} teknologi</span>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div className="mb-6">
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {project.description}
              </p>
            </div>
          )}

          <Separator className="bg-border/20 mb-6" />

          {/* Tech Stack */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs font-medium bg-muted/30 border border-border/30 px-3 py-1.5 rounded-xl"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons with micro-interactions */}
          {(project.live_url || project.github_url) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.live_url && (
                <Button
                  asChild
                  className="btn-shimmer gradient-bg text-white hover:opacity-95 shadow-md hover:shadow-xl rounded-xl font-bold gap-2 glow group active:scale-95 transition-all duration-200"
                >
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 group-hover:scale-125 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    <span>Buka Live Demo</span>
                  </a>
                </Button>
              )}
              {project.github_url && (
                <Button
                  variant="outline"
                  asChild
                  className="border-border/60 hover:bg-muted/40 rounded-xl font-bold gap-2 gradient-border group hover:border-primary/50 active:scale-95 transition-all duration-200"
                >
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Lihat Source Code</span>
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
