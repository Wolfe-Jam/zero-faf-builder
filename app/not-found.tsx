import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground space-y-6 text-center">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center animate-pulse">
        <FileQuestion className="w-12 h-12 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">404 - Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          This page seems to have rolled away.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
