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
      className={`relative rounded-xl p-2.5 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground ${className}`}
      aria-label={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
      title={isDark ? 'Mode Terang' : 'Mode Gelap'}
    >
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-400 rotate-0 scale-100 transition-all duration-300" />
        ) : (
          <Moon className="h-4 w-4 text-indigo-600 rotate-0 scale-100 transition-all duration-300" />
        )}
      </div>
      {showLabel && (
        <span className="ml-2 text-xs font-medium">
          {isDark ? 'Mode Terang' : 'Mode Gelap'}
        </span>
      )}
    </Button>
  )
}
