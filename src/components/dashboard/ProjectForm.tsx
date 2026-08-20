import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Loader2, Plus, Sparkles, X } from 'lucide-react'
import { supabase, type Project } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

type ProjectFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectToEdit?: Project | null
  onSuccess: () => void
}

export default function ProjectForm({
  open,
  onOpenChange,
  projectToEdit,
  onSuccess,
}: ProjectFormProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [techInput, setTechInput] = useState('')
  const [techStack, setTechStack] = useState<string[]>([])
  const [liveUrl, setLiveUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('published')
  const [isFeatured, setIsFeatured] = useState(false)

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title || '')
      setDescription(projectToEdit.description || '')
      setImageUrl(projectToEdit.image_url || '')
      setTechStack(projectToEdit.tech_stack || [])
      setLiveUrl(projectToEdit.live_url || '')
      setGithubUrl(projectToEdit.github_url || '')
      setStatus(projectToEdit.status || 'published')
      setIsFeatured(projectToEdit.is_featured || false)
    } else {
      resetForm()
    }
  }, [projectToEdit, open])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setImageUrl('')
    setTechInput('')
    setTechStack([])
    setLiveUrl('')
    setGithubUrl('')
    setStatus('published')
    setIsFeatured(false)
  }

  const handleAddTech = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return
    e.preventDefault()
    const trimmed = techInput.trim()
    if (trimmed && !techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed])
      setTechInput('')
    }
  }

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Judul proyek wajib diisi')
      return
    }

    setLoading(true)
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        image_url: imageUrl.trim() || null,
        tech_stack: techStack,
        live_url: liveUrl.trim() || null,
        github_url: githubUrl.trim() || null,
        status,
        is_featured: isFeatured,
        user_id: user?.id,
        updated_at: new Date().toISOString(),
      }

      if (projectToEdit) {
        const { error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', projectToEdit.id)

        if (error) throw error
        toast.success('Proyek berhasil diperbarui!')
      } else {
        const { error } = await supabase.from('projects').insert([payload])
        if (error) throw error
        toast.success('Proyek baru berhasil ditambahkan!')
      }

      onSuccess()
      onOpenChange(false)
      resetForm()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan proyek'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold">
              {projectToEdit ? 'Edit Proyek' : 'Tambah Proyek Baru'}
            </DialogTitle>
          </div>
          <DialogDescription>
            Isi rincian informasi proyek yang akan ditampilkan pada portofolio Anda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-semibold">
              Judul Proyek <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Contoh: E-Commerce Store Platform"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-background/60"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-semibold">
              Deskripsi
            </Label>
            <Textarea
              id="description"
              placeholder="Deskripsi singkat mengenai proyek, masalah yang diselesaikan, atau fitur unggulan..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-background/60"
            />
          </div>

          {/* Image URL & Live Preview */}
          <div className="space-y-1.5">
            <Label htmlFor="imageUrl" className="text-xs font-semibold">
              URL Gambar Thumbnail
            </Label>
            <Input
              id="imageUrl"
              placeholder="https://images.unsplash.com/photo-..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-background/60"
            />
            {imageUrl && (
              <div className="mt-2 relative rounded-xl overflow-hidden aspect-video max-h-40 border border-border/40 bg-muted/20">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
                  }}
                />
              </div>
            )}
          </div>

          {/* Tech Stack Tags Input */}
          <div className="space-y-1.5">
            <Label htmlFor="techStack" className="text-xs font-semibold">
              Tech Stack / Teknologi
            </Label>
            <div className="flex gap-2">
              <Input
                id="techStack"
                placeholder="Ketik teknologi (cth: React, Tailwind, Supabase) lalu tekan Enter"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleAddTech}
                className="bg-background/60"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddTech}
                className="px-3"
              >
                <Plus className="h-4 w-4 mr-1" /> Tambah
              </Button>
            </div>
            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="flex items-center gap-1 bg-muted/60 pl-2.5 pr-1 py-1"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="hover:text-destructive p-0.5 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="liveUrl" className="text-xs font-semibold">
                URL Live Demo
              </Label>
              <Input
                id="liveUrl"
                placeholder="https://my-app.vercel.app"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="bg-background/60"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="githubUrl" className="text-xs font-semibold">
                URL GitHub Repository
              </Label>
              <Input
                id="githubUrl"
                placeholder="https://github.com/user/repo"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="bg-background/60"
              />
            </div>
          </div>

          {/* Status & Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/30">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Status Publikasi</Label>
              <Select
                value={status}
                onValueChange={(val: 'draft' | 'published') => setStatus(val)}
              >
                <SelectTrigger className="bg-background/60">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Dipublikasikan (Publik)</SelectItem>
                  <SelectItem value="draft">Draft (Disembunyikan)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/30">
              <div className="space-y-0.5">
                <Label htmlFor="featured-switch" className="text-xs font-semibold cursor-pointer">
                  Jadikan Proyek Unggulan
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Akan disorot di bagian atas portofolio
                </p>
              </div>
              <Switch
                id="featured-switch"
                checked={isFeatured}
                onCheckedChange={setIsFeatured}
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-border/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="gradient-bg text-white hover:opacity-90 shadow-md font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : projectToEdit ? (
                'Simpan Perubahan'
              ) : (
                'Tambah Proyek'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
