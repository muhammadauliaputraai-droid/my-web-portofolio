export default function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg glow animate-pulse mb-4">
        <span className="text-sm font-black text-white tracking-wider">AP</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
        <span>Memuat halaman...</span>
      </div>
    </div>
  )
}
