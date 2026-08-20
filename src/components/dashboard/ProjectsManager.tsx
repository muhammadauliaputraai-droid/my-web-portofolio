import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
  Star,
  Eye,
  EyeOff,
  FolderPlus,
  Loader2,
} from 'lucide-react'
import { GithubIcon } from '@/components/ui/icons'
import { supabase, type Project } from '@/lib/supabase'
import ProjectForm from './ProjectForm'
import { toast } from 'sonner'

type ProjectsManagerProps = {
  projects: Project[]
  loading: boolean
  onRefresh: () => void
}

export default function ProjectsManager({
  projects,
  loading,
  onRefresh,
}: ProjectsManagerProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  // Form modal state
  const [formOpen, setFormOpen] = useState(false)
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null)

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech_stack?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleOpenAdd = () => {
    setProjectToEdit(null)
    setFormOpen(true)
  }

  const handleOpenEdit = (project: Project) => {
    setProjectToEdit(project)
    setFormOpen(true)
  }

  const handleToggleStatus = async (project: Project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published'
    try {
      const { error } = await supabase
        .from('projects')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', project.id)

      if (error) throw error
      toast.success(
        `Status diubah menjadi ${newStatus === 'published' ? 'Dipublikasikan' : 'Draft'}`
      )
      onRefresh()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mengubah status'
      toast.error(errorMessage)
    }
  }

  const handleToggleFeatured = async (project: Project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          is_featured: !project.is_featured,
          updated_at: new Date().toISOString(),
        })
        .eq('id', project.id)

      if (error) throw error
      toast.success(
        project.is_featured
          ? 'Proyek dihapus dari featured'
          : 'Proyek ditandai sebagai featured!'
      )
      onRefresh()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mengubah status featured'
      toast.error(errorMessage)
    }
  }

  const handleDelete = async () => {
    if (!projectToDelete) return
    setDeleting(true)
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete.id)

      if (error) throw error
      toast.success('Proyek berhasil dihapus')
      setDeleteModalOpen(false)
      setProjectToDelete(null)
      onRefresh()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menghapus proyek'
      toast.error(errorMessage)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search & Filter */}
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama, deskripsi, tech stack..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-card/60"
            />
          </div>

          <div className="flex gap-1.5 p-1 rounded-xl bg-muted/40 border border-border/30">
            {(['all', 'published', 'draft'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${
                  statusFilter === st
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {st === 'all' ? 'Semua' : st === 'published' ? 'Publik' : 'Draft'}
              </button>
            ))}
          </div>
        </div>

        {/* Add Project CTA */}
        <Button
          onClick={handleOpenAdd}
          className="gradient-bg text-white hover:opacity-90 shadow-md font-semibold gap-2"
        >
          <Plus className="h-4 w-4" /> Tambah Proyek Baru
        </Button>
      </div>

      {/* Table / List Container */}
      <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Memuat daftar proyek...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4 border border-border/30">
              <FolderPlus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Tidak Ada Proyek Ditemukan</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Coba ganti kata kunci pencarian atau filter status.'
                : 'Mulai kelola portofolio Anda dengan menambahkan proyek pertama.'}
            </p>
            <Button
              onClick={handleOpenAdd}
              className="gradient-bg text-white hover:opacity-90 gap-2"
            >
              <Plus className="h-4 w-4" /> Buat Proyek Pertama
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="w-[80px]">Preview</TableHead>
                <TableHead>Judul & Deskripsi</TableHead>
                <TableHead className="hidden md:table-cell">Teknologi</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="hidden sm:table-cell w-[100px] text-center">Featured</TableHead>
                <TableHead className="w-[100px] text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow
                  key={project.id}
                  className="border-border/20 hover:bg-muted/20 transition-colors"
                >
                  {/* Thumbnail */}
                  <TableCell>
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-muted/40 border border-border/30 flex items-center justify-center">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-bold text-muted-foreground/60">
                          {project.title.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Title & Description */}
                  <TableCell>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-sm">
                          {project.title}
                        </span>
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title="Buka Live Demo"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title="Buka GitHub"
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                        {project.description || 'Tidak ada deskripsi'}
                      </p>
                    </div>
                  </TableCell>

                  {/* Tech stack */}
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {project.tech_stack?.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 bg-muted/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {(project.tech_stack?.length || 0) > 3 && (
                        <span className="text-[10px] text-muted-foreground self-center">
                          +{(project.tech_stack?.length || 0) - 3} lagi
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <button
                      onClick={() => handleToggleStatus(project)}
                      className="cursor-pointer"
                      title="Klik untuk ubah status"
                    >
                      <Badge
                        variant={project.status === 'published' ? 'default' : 'secondary'}
                        className={`text-xs capitalize font-medium ${
                          project.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                        }`}
                      >
                        {project.status === 'published' ? 'Publik' : 'Draft'}
                      </Badge>
                    </button>
                  </TableCell>

                  {/* Featured Status */}
                  <TableCell className="hidden sm:table-cell text-center">
                    <button
                      onClick={() => handleToggleFeatured(project)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        project.is_featured
                          ? 'text-pink-400 bg-pink-500/10 hover:bg-pink-500/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                      title={project.is_featured ? 'Proyek Unggulan' : 'Bukan Unggulan'}
                    >
                      <Star
                        className={`h-4 w-4 ${project.is_featured ? 'fill-pink-400' : ''}`}
                      />
                    </button>
                  </TableCell>

                  {/* Actions Dropdown */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => handleOpenEdit(project)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit Proyek
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(project)}>
                          {project.status === 'published' ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" /> Jadikan Draft
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" /> Publikasikan
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleFeatured(project)}>
                          <Star className="mr-2 h-4 w-4" />
                          {project.is_featured ? 'Hapus Featured' : 'Jadikan Featured'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setProjectToDelete(project)
                            setDeleteModalOpen(true)
                          }}
                          className="text-destructive focus:text-destructive focus:bg-destructive/10"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Hapus Proyek
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Form Modal */}
      <ProjectForm
        open={formOpen}
        onOpenChange={setFormOpen}
        projectToEdit={projectToEdit}
        onSuccess={onRefresh}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <Trash2 className="h-5 w-5" /> Hapus Proyek
            </DialogTitle>
            <DialogDescription className="pt-2">
              Apakah Anda yakin ingin menghapus proyek{' '}
              <strong className="text-foreground">{projectToDelete?.title}</strong>? Tindakan
              ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4 gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleting}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menghapus...
                </>
              ) : (
                'Ya, Hapus'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
