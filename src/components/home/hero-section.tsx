import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-24 md:py-32">
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">AI-Powered Knowledge Assistant</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
          Master <span className="text-primary">Everything</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl leading-relaxed">
          Your intelligent companion for research, learning, and discovery.
        </p>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl leading-relaxed">
          Upload any content and let AI transform it into actionable insights.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
            Try NotebookLM Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
            <Play className="mr-2 h-4 w-4" /> Watch Demo
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">Trusted by 100,000+ researchers, students, and professionals</p>

        {/* Interface Preview */}
        <div className="mt-16 w-full max-w-4xl">
          <div className="rounded-xl border-2 border-primary/20 bg-card overflow-hidden shadow-2xl shadow-primary/10">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-background">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="text-sm text-muted-foreground font-mono">
                  How can I summarize the key concepts...
                  <span className="inline-block w-1 h-4 bg-primary ml-1 animate-pulse" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Study Guide", "Summary", "Key Points", "Quiz"].map((item) => (
                  <div
                    key={item}
                    className="px-4 py-3 rounded-lg border border-border/50 bg-background/10 hover:border-primary/50 transition-colors text-center text-sm cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
