'use client'

export function Footer() {
  return (
    <footer className="border-t bg-white/70 dark:bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DearEcho. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
