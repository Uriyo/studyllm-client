
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border/50 bg-background/60 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-semibold">BaseLLM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#use-cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Use Cases
          </Link>
          <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <Link href={'/sign-in'}>Sign In</Link>
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start Free
          </Button>
        </div>
      </div>
    </header>
  )
}
