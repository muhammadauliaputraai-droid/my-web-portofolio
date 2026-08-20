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
    <Card className="group overflow-hidden border-border/30 bg-card/50 backdrop-blur-sm hover-lift transition-all duration-500 hover:border-primary/30">
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-muted/30">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full gradient-bg-animated opacity-30 flex items-center justify-center">
            <span className="text-4xl font-bold text-white/30">{project.title.charAt(0)}</span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex gap-2">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink className="h-4 w-4 text-white" />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                aria-label="GitHub repository"
              >
                <GithubIcon className="h-4 w-4 text-white" />
              </a>
            )}
          </div>
        </div>
        {/* Featured Badge */}
        {project.is_featured && (
          <div className="absolute top-3 right-3">
            <Badge className="gradient-bg text-white border-0 shadow-md">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
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
              className="text-xs font-medium bg-muted/50 hover:bg-muted transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
