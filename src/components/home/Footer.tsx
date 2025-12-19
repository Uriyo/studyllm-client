import Link from "next/link"
import { Logo } from "../ui/Logo"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background text-white ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo />
              <span className="text-lg ">
                  <span className=" decoration-2 font-bold underline-offset-2">Rag</span>ment_
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered knowledge assistant for research, learning, and discovery.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              {/* <li>
                <Link href="#pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li> */}
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                 <Link href="#" className="hover:text-foreground transition-colors">
                  Blog
                </Link> 
              </li> */}
            </ul>
          </div>

          {/* <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
               <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li> 
              <li>
                 <Link href="#" className="hover:text-foreground transition-colors">
                  Contact
                </Link> 
              </li>
            </ul>
          </div> */}
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Ragment. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/refund" className="hover:text-foreground transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
