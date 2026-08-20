import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send, Mail, MapPin, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { toast } from 'sonner'

export default function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Mohon lengkapi semua kolom yang wajib diisi')
      return
    }

    setSending(true)
    // Simulate lightweight submission
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      toast.success('Pesan Anda berhasil dikirim! Terima kasih.')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    }, 1000)
  }

  return (
    <section id="contact" className="py-24 relative border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 gradient-border">
            Hubungi Saya
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Mari <span className="gradient-text">Berkolaborasi</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Punya ide proyek menarik, tawaran kerja sama, atau sekadar ingin berdiskusi? Kirimkan pesan Anda melalui formulir di bawah.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl glass border border-border/40 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-md">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Terbuka untuk Peluang Baru</h3>
                  <p className="text-xs text-muted-foreground">Full-time, Kontrak, atau Freelance</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Saya selalu antusias membangun solusi digital baru dengan performa tinggi.
                Respons cepat dijamin dalam kurun waktu kurang dari 24 jam.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 pt-2">
                <a
                  href="mailto:hello@example.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-card/60 hover:bg-muted/40 border border-border/30 transition-all hover-lift group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">Email</span>
                    <span className="text-xs sm:text-sm font-semibold text-foreground">hello@example.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-card/60 border border-border/30">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">Lokasi</span>
                    <span className="text-xs sm:text-sm font-semibold text-foreground">Indonesia (WIB / UTC+7)</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-border/30">
                <span className="text-xs font-semibold text-muted-foreground block mb-3">
                  Saluran Profesional
                </span>
                <div className="flex gap-2.5">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass hover:bg-muted/40 border border-border/40 text-muted-foreground hover:text-foreground transition-all hover-lift"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass hover:bg-muted/40 border border-border/40 text-muted-foreground hover:text-foreground transition-all hover-lift"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl glass-strong border border-border/40 shadow-xl relative">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg text-foreground">Kirim Pesan Langsung</h3>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Pesan Berhasil Terkirim!</h4>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Terima kasih telah menghubungi saya. Saya akan segera membaca dan merespons pesan Anda.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 rounded-xl text-xs"
                  >
                    Kirim Pesan Lainnya
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name" className="text-xs font-semibold">
                        Nama Lengkap <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        placeholder="Contoh: John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-background/50 border-border/40 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email" className="text-xs font-semibold">
                        Email Anda <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-background/50 border-border/40 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-subject" className="text-xs font-semibold">
                      Subjek / Topik Proyek
                    </Label>
                    <Input
                      id="contact-subject"
                      placeholder="Contoh: Tawaran Proyek Web App Fullstack"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="bg-background/50 border-border/40 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message" className="text-xs font-semibold">
                      Pesan Anda <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Ceritakan detail proyek atau pertanyaan Anda..."
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="bg-background/50 border-border/40 rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full gradient-bg text-white hover:opacity-90 font-semibold shadow-md rounded-xl h-11 text-sm gap-2 glow"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Mengirim Pesan...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Kirim Pesan Sekarang</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
