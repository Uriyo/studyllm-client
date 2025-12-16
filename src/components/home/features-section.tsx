import { Upload, Zap, Network, FileText, Headphones, Share2 } from "lucide-react"

const features = [
  {
    icon: Upload,
    title: "Import Any Source",
    description:
      "Upload documents, videos, podcasts, websites, and more. Ragment ingests all formats and extracts meaningful knowledge automatically.",
    tagline: "Universal knowledge ingestion.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description:
      "Get immediate summaries, key insights, and connections between your sources. No more hours of manual note-taking.",
    tagline: "Insights in seconds, not hours.",
  },
  {
    icon: Network,
    title: "Smart Connections",
    description: "AI discovers hidden relationships across your documents, surfacing insights you might have missed.",
    tagline: "Uncover hidden patterns.",
  },
  {
    icon: FileText,
    title: "Auto-Generated Content",
    description: "Create study guides, briefing documents, timelines, and FAQs from your sources with one click.",
    tagline: "Content creation on autopilot.",
  },
//   {
//     icon: Headphones,
//     title: "Audio Overviews",
//     description: "Transform your research into engaging audio summaries. Perfect for learning on the go.",
//     tagline: "Learn while you move.",
//   },
//   {
//     icon: Share2,
//     title: "Collaborate & Share",
//     description: "Share notebooks with your team or make them public. Collaborate on research in real-time.",
//     tagline: "Collective intelligence, unlocked.",
//   },
]

export function FeaturesSection() {
  return (
    <section id="features" className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
          Your Knowledge, <span className="text-primary">Supercharged</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to turn information overload into actionable understanding.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className="group relative p-6 rounded-xl border border-border/50 bg-card hover:border-primary/50 transition-all duration-300"
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 border border-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">{feature.description}</p>
              <p className="text-sm text-primary italic">{feature.tagline}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
