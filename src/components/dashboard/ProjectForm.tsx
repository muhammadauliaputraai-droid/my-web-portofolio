import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Plus, Sparkles, X, UploadCloud, Image as ImageIcon, Link as LinkIcon, Trash2 } from 'lucide-react'
import { supabase, PROJECT_CATEGORIES, type Project, type ProjectCategory } from '@/lib/supabase'
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
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload')
  const [techInput, setTechInput] = useState('')
  const [techStack, setTechStack] = useState<string[]>([])
  const [liveUrl, setLiveUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('published')
  const [isFeatured, setIsFeatured] = useState(false)
  const [category, setCategory] = useState<ProjectCategory | ''>('')

  const fileInputRef = useRef<HTMLInputElement>(null)

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
      setCategory(projectToEdit.category || '')
      setImageTab(projectToEdit.image_url?.includes('supabase') ? 'upload' : 'url')
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
    setCategory('')
    setImageTab('upload')
  }

  const handleFileUpload = async (file: File) => {
    if (!file) return

    // Validasi format
    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar (JPG, PNG, WebP, GIF, SVG)')
      return
    }

    // Validasi ukuran (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran gambar maksimal 5MB')
      return
    }

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9]/g, '_')
      const fileName = `${Date.now()}_${cleanFileName}.${fileExt}`
      const filePath = `projects/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) {
        // Jika bucket belum dibuat di Supabase, berikan instruksi ramah
        if (uploadError.message.includes('Bucket not found') || uploadError.message.includes('not found')) {
          throw new Error('Bucket "project-images" belum dibuat di Supabase. Silakan jalankan script supabase_storage_setup.sql di SQL Editor Supabase.')
        }
        throw uploadError
      }

      const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath)

      if (data?.publicUrl) {
        setImageUrl(data.publicUrl)
        toast.success('Gambar berhasil di-upload ke Supabase Storage!')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengupload gambar'
      toast.error(msg)
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
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
        category: category || null,
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

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">
              Kategori
            </Label>
            <Select
              value={category}
              onValueChange={(val) => setCategory(val as ProjectCategory)}
            >
              <SelectTrigger className="bg-background/60">
                <SelectValue placeholder="Pilih kategori proyek" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload / URL with Drag & Drop */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-primary" />
                Gambar Thumbnail Proyek
              </Label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="text-xs text-destructive hover:underline flex items-center gap-1"
                >
                  <Trash2 className="h-3 w-3" /> Hapus Gambar
                </button>
              )}
            </div>

            {imageUrl ? (
              /* Image Preview Box */
              <div className="relative rounded-2xl overflow-hidden border border-border/40 bg-muted/20 aspect-video max-h-48 group">
                <img
                  src={imageUrl}
                  alt="Thumbnail Proyek"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="rounded-xl text-xs gap-1.5"
                  >
                    <UploadCloud className="h-3.5 w-3.5" />
                    Ganti File
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => setImageUrl('')}
                    className="rounded-xl text-xs gap-1.5"
                  >
                    <X className="h-3.5 w-3.5" />
                    Hapus
                  </Button>
                </div>
              </div>
            ) : (
              /* Image Upload Tabs */
              <Tabs
                value={imageTab}
                onValueChange={(val) => setImageTab(val as 'upload' | 'url')}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-2 h-9">
                  <TabsTrigger value="upload" className="text-xs gap-1.5">
                    <UploadCloud className="h-3.5 w-3.5" />
                    Upload File (Storage)
                  </TabsTrigger>
                  <TabsTrigger value="url" className="text-xs gap-1.5">
                    <LinkIcon className="h-3.5 w-3.5" />
                    Link URL
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-0">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                      dragActive
                        ? 'border-primary bg-primary/10 scale-[0.99]'
                        : 'border-border/60 hover:border-primary/40 hover:bg-muted/20 bg-background/30'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0])
                        }
                      }}
                    />

                    {uploading ? (
                      <div className="py-4 flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">
                          Mengupload gambar ke Supabase Storage...
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <UploadCloud className="h-6 w-6" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-semibold text-foreground">
                            Klik untuk memilih gambar atau geser (drag & drop) ke sini
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, WebP, SVG, atau GIF (Maks. 5MB)
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="url" className="mt-0">
                  <Input
                    placeholder="https://images.unsplash.com/photo-..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="bg-background/60"
                  />
                </TabsContent>
              </Tabs>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0])
                }
              }}
            />
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
              disabled={loading || uploading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading || uploading}
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
