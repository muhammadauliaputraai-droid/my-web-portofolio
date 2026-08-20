import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/ui/icons'
import type { Project } from '@/lib/supabase'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-3xl border-border/20 bg-card/30 backdrop-blur-sm hover-lift transition-all duration-500 hover:border-primary/20 gradient-border">
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-muted/20">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full gradient-bg-animated opacity-20 flex items-center justify-center">
            <span className="text-5xl font-black text-white/20">{project.title.charAt(0)}</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-5">
          <div className="flex gap-2.5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md hover:bg-white/25 transition-all text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md hover:bg-white/25 transition-all text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                Code
              </a>
            )}
          </div>
        </div>
        {/* Featured Badge */}
        {project.is_featured && (
          <div className="absolute top-4 right-4">
            <Badge className="gradient-bg-animated text-white border-0 shadow-xl text-[10px] font-bold px-3 py-1 rounded-full">
              ★ Featured
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-2.5 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack?.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-[11px] font-medium bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors px-2.5 py-0.5 rounded-lg"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
