'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check, Leaf, Github, Folder, Loader2, Info } from 'lucide-react'

export default function Home() {
  const [showLocalModal, setShowLocalModal] = useState(false)
  const [showGithubModal, setShowGithubModal] = useState(false)
  const [githubUrl, setGithubUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [urlError, setUrlError] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const mcpServerUrl = process.env.NEXT_PUBLIC_MCP_SERVER_URL || 'https://grok-faf-mcp.vercel.app'
  const templateRepoUrl = process.env.NEXT_PUBLIC_TEMPLATE_REPO_URL || 'https://github.com/wolfe-jam/zero-faf-builder'
  const npxCommand = `npx faf-cli@latest init --mcp=${mcpServerUrl}`

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(npxCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleGithubDownload = async () => {
    setUrlError('')
    
    if (!githubUrl) {
      setUrlError('Please enter a GitHub URL')
      return
    }

    try {
      const url = new URL(githubUrl)
      if (!url.hostname.includes('github.com')) {
        setUrlError('Please enter a valid GitHub URL')
        return
      }
    } catch (e) {
      setUrlError('Invalid URL format')
      return
    }

    setIsDownloading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsDownloading(false)
    setShowGithubModal(false)
    setGithubUrl('')
    setUrlError('')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-black" data-testid="main-container">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl w-full space-y-12 relative z-10 opacity-0 transition-opacity duration-500" style={{ opacity: isLoaded ? 1 : 0 }}>
        {/* Hero Section */}
        <div className="text-center space-y-6" data-testid="hero-section">
          <div className="flex justify-center mb-8">
            {/* Big Orange with green symbolic leaf */}
            <div className="relative animate-pulse-glow opacity-100" data-testid="big-orange-logo" role="img" aria-label="Big Orange Logo">
              {/* The Orange Body */}
              <div className="w-32 h-32 rounded-full bg-black relative z-10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary shadow-[0_0_50px_rgba(255,165,0,0.3)]" />
                {/* Subtle gradient for 3D effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
              </div>
              {/* The Green Leaf */}
              <div className="absolute -top-6 right-0 z-20 transition-transform hover:rotate-[25deg] rotate-[15deg]">
                <Leaf 
                  className="w-20 h-20 text-green-500 fill-green-500 drop-shadow-md" 
                  strokeWidth={1.5} 
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-balance">
            <span className="text-primary">Zero-FAF-Builder</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/90 text-balance">
            Zero faff from day zero — Grok-ready in one click
          </p>
        </div>

        {/* Three Main Action Buttons */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Local Folder Button */}
          <div className="relative group">
            <Button
              size="lg"
              className="w-full h-auto py-8 px-6 flex flex-col items-center gap-4 text-lg font-semibold bg-transparent border-2 border-primary text-primary hover:bg-primary/20 hover:text-primary shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/60 hover:scale-105"
              onClick={() => setShowLocalModal(true)}
              data-testid="btn-local-folder"
            >
              <Folder className="w-12 h-12" />
              <span className="text-center">I have a local folder</span>
            </Button>
            <div className="absolute top-3 right-3 z-20">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button
                    className="text-primary/60 hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Show guide"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 bg-card text-card-foreground border-border">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">How it works</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex gap-2">
                        <span className="font-bold text-primary">A.</span>
                        <span>Open your terminal</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold text-primary">B.</span>
                        <span>Paste the command (we will provide)</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold text-primary">C.</span>
                        <span>Run to configure</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>

          {/* Start Fresh Button - Primary Action */}
          <div className="relative group">
            <Button
              size="lg"
              className="w-full h-auto py-8 px-6 flex flex-col items-center gap-4 text-lg font-semibold bg-transparent border-2 border-zinc-400 text-zinc-100 hover:bg-white/30 hover:text-white hover:border-white shadow-lg shadow-white/5 transition-all hover:shadow-xl hover:shadow-white/20 hover:scale-105"
              asChild
              data-testid="btn-start-fresh"
            >
              <a
                href={`https://vercel.com/new/clone?repository-url=${encodeURIComponent(templateRepoUrl)}&project-name=zero-faf-project&repository-name=zero-faf-project`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12"
                  aria-hidden="true"
                >
                  <path d="M12 1L24 22H0L12 1Z" />
                </svg>
                <span className="text-center">Start fresh</span>
              </a>
            </Button>
            <div className="absolute top-3 right-3 z-20">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button
                    className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Show guide"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 bg-zinc-950 text-white border-zinc-800">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-white">How it works</h4>
                    <div className="text-sm space-y-1 text-zinc-400">
                      <div className="flex gap-2">
                        <span className="font-bold text-white">A.</span>
                        <span>Click to start</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold text-white">B.</span>
                        <span>Connect Git account</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold text-white">C.</span>
                        <span>Get live URL</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>

          {/* GitHub Repo Button */}
          <div className="relative group">
            <Button
              size="lg"
              className="w-full h-auto py-8 px-6 flex flex-col items-center gap-4 text-lg font-semibold bg-transparent border-2 border-primary text-primary hover:bg-primary/20 hover:text-primary shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/60 hover:scale-105"
              onClick={() => setShowGithubModal(true)}
              data-testid="btn-github-repo"
            >
              <Github className="w-12 h-12" />
              <span className="text-center">I have a GitHub repo</span>
            </Button>
            <div className="absolute top-3 right-3 z-20">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button
                    className="text-primary/60 hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Show guide"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 bg-card text-card-foreground border-border">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">How it works</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex gap-2">
                        <span className="font-bold text-primary">A.</span>
                        <span>Copy repo URL</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold text-primary">B.</span>
                        <span>Paste in modal</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold text-primary">C.</span>
                        <span>Analyze in cloud</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center space-y-2 pt-12">
          <p className="text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            <span>Built with love by</span>
            <a
              href="https://twitter.com/wolfejam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @wolfejam
            </a>
            <span>·</span>
            <span>Dedicated to</span>
            <a
              href="https://twitter.com/elonmusk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @elonmusk
            </a>
            <span>and the #1 model</span>
            <span className="inline-block animate-pulse-heart">❤️</span>
          </p>
        </footer>
      </div>

      {/* Local Folder Modal */}
      <Dialog open={showLocalModal} onOpenChange={setShowLocalModal}>
        <DialogContent className="sm:max-w-2xl" data-testid="modal-local">
          <DialogHeader>
            <DialogTitle className="text-2xl">Initialize Your Local Project</DialogTitle>
            <DialogDescription>
              Run this command in your project folder to add project.faf with Grok MCP integration
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="command">Command</Label>
              <div className="flex gap-2">
                <Input
                  id="command"
                  value={npxCommand}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="shrink-0"
                  title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-green-500 animate-in fade-in">
                  ✓ Command copied to clipboard!
                </p>
              )}
            </div>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold">What this does:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Creates project.faf with quality_bar: zero_errors</li>
                <li>Configures Grok MCP server integration</li>
                <li>Sets up championship orange branding</li>
                <li>Ready for immediate development</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* GitHub Repo Modal */}
      <Dialog open={showGithubModal} onOpenChange={setShowGithubModal}>
        <DialogContent className="sm:max-w-2xl" data-testid="modal-github">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add FAF to Your GitHub Repo</DialogTitle>
            <DialogDescription>
              Enter your GitHub repository URL to download it with project.faf injected
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="github-url">GitHub Repository URL</Label>
              <Input
                id="github-url"
                placeholder="https://github.com/username/repo"
                value={githubUrl}
                onChange={(e) => {
                  setGithubUrl(e.target.value)
                  setUrlError('')
                }}
                data-testid="input-github-url"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGithubDownload()
                }}
                className={urlError ? 'border-red-500' : ''}
              />
              {urlError && (
                <p className="text-sm text-red-500 animate-in fade-in">
                  {urlError}
                </p>
              )}
            </div>
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleGithubDownload}
              disabled={!githubUrl || isDownloading}
              data-testid="btn-download-github"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Injecting FAF...
                </>
              ) : (
                'Download ZIP with project.faf'
              )}
            </Button>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold">What you'll get:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Your complete repository code</li>
                <li>project.faf pre-configured at root</li>
                <li>Grok MCP integration ready</li>
                <li>Zero manual setup required</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
