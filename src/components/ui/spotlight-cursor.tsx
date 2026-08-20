import { useEffect, useRef } from 'react'

export default function SpotlightCursor() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId: number

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e

      animationFrameId = requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.setProperty('--mouse-x', `${clientX}px`)
          containerRef.current.style.setProperty('--mouse-y', `${clientY}px`)
        }
      })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 opacity-60 dark:opacity-80"
      style={{
        background: `radial-gradient(650px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), hsl(var(--primary) / 0.08), transparent 60%)`,
      }}
    />
  )
}
