import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/ui/icons'
import type { Project } from '@/lib/supabase'

type ProjectCardProps = {
  project: Project
  onClick?: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card
      className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card/90 hover:border-primary/50 backdrop-blur-md shadow-lg hover-lift transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-muted/20">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-muted/30 flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground/30">{project.title.charAt(0)}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
          <div className="flex gap-2">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <ExternalLink className="h-3 w-3" />
                Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <GithubIcon className="h-3 w-3" />
                Code
              </a>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {project.is_featured && (
            <Badge className="gradient-bg text-white border-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
              ★ Featured
            </Badge>
          )}
          {project.category && (
            <Badge variant="secondary" className="glass text-foreground/90 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-border/40">
              {project.category}
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3.5 line-clamp-2">
            {project.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack?.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-[11px] font-medium bg-muted/40 border border-border/30 px-2 py-0.5 rounded-md"
            >
              {tech}
            </Badge>
          ))}
          {(project.tech_stack?.length || 0) > 4 && (
            <Badge variant="secondary" className="text-[11px] font-medium bg-muted/40 border border-border/30 px-2 py-0.5 rounded-md">
              +{(project.tech_stack?.length || 0) - 4}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
