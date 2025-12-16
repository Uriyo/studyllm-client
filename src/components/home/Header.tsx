
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "../ui/Logo"

export function Header() {
  return (
    <header className="border-b border-border/50 bg-background text-white backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
             <Logo />
          <span className="text-lg ">
                  <span className=" decoration-2 font-bold underline-offset-2">Rag</span>ment_
              </span>
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
