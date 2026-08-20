import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

type ThemeToggleProps = {
  className?: string
  showLabel?: boolean
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`relative rounded-xl p-2.5 hover:bg-muted/60 transition-all duration-300 text-muted-foreground hover:text-foreground group active:scale-90 ${className}`}
      aria-label={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
      title={isDark ? 'Mode Terang' : 'Mode Gelap'}
    >
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-400 group-hover:rotate-90 group-hover:scale-110 transition-all duration-300" />
        ) : (
          <Moon className="h-4 w-4 text-sky-600 group-hover:-rotate-45 group-hover:scale-110 transition-all duration-300" />
        )}
      </div>
      {showLabel && (
        <span className="ml-2 text-xs font-semibold">
          {isDark ? 'Mode Terang' : 'Mode Gelap'}
        </span>
      )}
    </Button>
  )
}
