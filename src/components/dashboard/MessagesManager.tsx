import { useState, useEffect, useCallback } from 'react'
import { supabase, type ContactMessage } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Trash2, CheckCircle2, Clock, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export default function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchMessages = useCallback(async () => {
    setRefreshing(true)
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setMessages(data as ContactMessage[])
      }
    } catch (err) {
      console.error('Error fetching messages:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const toggleReadStatus = async (msg: ContactMessage) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: !msg.is_read })
        .eq('id', msg.id)

      if (!error) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, is_read: !m.is_read } : m))
        )
        toast.success(msg.is_read ? 'Ditandai belum dibaca' : 'Ditandai sudah dibaca')
      }
    } catch {
      toast.error('Gagal memperbarui status')
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pesan ini?')) return
    try {
      const { error } = await supabase.from('messages').delete().eq('id', id)
      if (!error) {
        setMessages((prev) => prev.filter((m) => m.id !== id))
        toast.success('Pesan berhasil dihapus')
      }
    } catch {
      toast.error('Gagal menghapus pesan')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Pesan Masuk (Inbox)</h2>
          <p className="text-xs text-muted-foreground">
            Daftar pesan dan formulir kontak yang dikirim oleh pengunjung web portofolio Anda.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchMessages}
          disabled={refreshing}
          className="gap-2 rounded-xl text-xs"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Segarkan
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-card/40 border border-border/40 animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-dashed border-border/60 p-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-foreground mb-1">Belum Ada Pesan Masuk</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Setiap pesan yang dikirim oleh pengunjung dari formulir kontak web akan muncul di sini secara realtime.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className={`rounded-2xl transition-all border ${
                msg.is_read
                  ? 'border-border/40 bg-card/40 opacity-80'
                  : 'border-primary/40 bg-card/90 shadow-md glow'
              }`}
            >
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-foreground">{msg.name}</h4>
                        {!msg.is_read && (
                          <Badge className="gradient-bg text-white border-0 text-[9px] px-1.5 py-0 rounded">
                            Baru
                          </Badge>
                        )}
                      </div>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        {msg.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(msg.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </div>
                </div>

                {msg.subject && (
                  <div className="mb-2">
                    <span className="text-xs font-bold text-foreground/90">
                      Subjek: {msg.subject}
                    </span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed mb-4 bg-muted/20 p-3 rounded-xl border border-border/20">
                  {msg.message}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-border/20">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleReadStatus(msg)}
                    className="text-xs text-muted-foreground hover:text-foreground h-8 px-2.5"
                  >
                    <CheckCircle2 className={`mr-1.5 h-3.5 w-3.5 ${msg.is_read ? 'text-primary' : 'text-muted-foreground'}`} />
                    {msg.is_read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="text-xs h-8 px-3 rounded-lg"
                    >
                      <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Balasan Pesan Portofolio')}`}>
                        <Mail className="mr-1.5 h-3 w-3" />
                        Balas Email
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteMessage(msg.id)}
                      className="text-xs text-destructive hover:bg-destructive/10 h-8 px-2.5 rounded-lg"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
