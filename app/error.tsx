'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground space-y-6 text-center">
      <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertTriangle className="w-12 h-12 text-destructive" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Something went wrong!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Even the Big Orange gets squeezed sometimes. We've logged this issue.
        </p>
      </div>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline">
          Reload Page
        </Button>
      </div>
    </div>
  )
}
