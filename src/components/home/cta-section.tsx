import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, CreditCard, Users } from "lucide-react"

export function CTASection() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
          Ready to Transform How You <span className="text-primary">Learn & Research</span>?
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of researchers, students, and professionals who&asp;ve supercharged their knowledge workflow with
          NotebookLM.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
            Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
            Talk to Sales
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Enterprise-grade security</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>100K+ active users</span>
          </div>
        </div>
      </div>
    </section>
  )
}
