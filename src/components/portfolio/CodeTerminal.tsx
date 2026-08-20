import { useState } from 'react'
import { Copy, Check, Terminal, FileCode, Sparkles } from 'lucide-react'

export default function CodeTerminal() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'contact'>('profile')

  const codeSnippets = {
    profile: `// developer.config.ts
export const developer = {
  name: "Muhammad Aulia Putra",
  role: "Full-Stack Web Developer",
  focus: ["React", "TypeScript", "Next.js", "Supabase"],
  status: "Available for interesting projects & collaboration",
  location: "Indonesia",
  passions: [
    "Clean Architecture",
    "Performant UI/UX",
    "Modern Web Technologies"
  ]
};`,
    skills: `// capabilities.json
{
  "frontend": ["React 19", "TypeScript", "Tailwind CSS", "Next.js"],
  "backend": ["Node.js", "Supabase", "PostgreSQL", "REST APIs"],
  "tools": ["Git", "Vite", "Figma", "Docker", "VS Code"],
  "coreValues": {
    "cleanCode": true,
    "responsiveDesign": "100%",
    "performanceFocused": true
  }
}`,
    contact: `// connect.sh
curl -X POST "https://api.portfolio.dev/collaborate" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sender": "Recruiter / Client",
    "opportunity": "Full-time / Freelance Project",
    "status": "Ready to build something great together 🚀"
  }'`,
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden glass-strong border border-border/50 shadow-2xl transition-all duration-300 hover:border-primary/40 text-left font-mono text-xs sm:text-sm">
      {/* Top Window Bar */}
      <div className="px-4 py-3 bg-muted/40 border-b border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-background/50 p-1 rounded-lg border border-border/30">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileCode className="h-3 w-3" />
            <span>Profile.ts</span>
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'skills'
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            <span>Skills.json</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'contact'
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Terminal className="h-3 w-3" />
            <span>Connect.sh</span>
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          title="Salin kode"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Code Display Area */}
      <div className="p-5 overflow-x-auto bg-card/60 leading-relaxed text-muted-foreground select-text">
        <pre className="text-xs sm:text-[13px]">
          <code>{codeSnippets[activeTab]}</code>
        </pre>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-muted/20 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>TypeScript 5.8 • UTF-8</span>
        </div>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  )
}
