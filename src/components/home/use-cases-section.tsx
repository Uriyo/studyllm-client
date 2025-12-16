import { GraduationCap, Search, Lightbulb, Users } from "lucide-react"

const useCases = [
  {
    icon: GraduationCap,
    label: "FROM CONFUSION TO CLARITY",
    title: "Accelerate Learning",
    description:
      "Upload lectures, textbooks, and research papers. Generate personalized study guides, flashcards, and audio summaries to master any subject faster.",
    tagline: "Learn smarter, not harder.",
  },
  {
    icon: Search,
    label: "FROM DATA TO DISCOVERIES",
    title: "Deep Research",
    description:
      "Import research documents, papers, and datasets. Let AI find patterns, synthesize findings, and generate comprehensive literature reviews automatically.",
    tagline: "Uncover hidden insights.",
  },
  {
    icon: Lightbulb,
    label: "FROM SCATTERED NOTES TO BIG IDEAS",
    title: "Creative Ideation",
    description:
      "Feed your brainstorms, market research, and competitor analysis. Get AI-powered suggestions for new angles, opportunities, and innovations.",
    tagline: "Spark breakthrough ideas.",
  },
  {
    icon: Users,
    label: "FROM SILOS TO SHARED WISDOM",
    title: "Team Knowledge",
    description:
      "Centralize team documentation, meeting notes, and project files. Create a living knowledge base that everyone can query and contribute to.",
    tagline: "Collective intelligence, unlocked.",
  },
]

export function UseCasesSection() {
  return (
    <section id="use-cases" className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
          Built for How <span className="text-primary">You Think</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you&asp;re studying, researching, or creating — NotebookLM adapts to your workflow.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {useCases.map((useCase) => {
          const Icon = useCase.icon
          return (
            <div
              key={useCase.title}
              className="group p-8 rounded-xl border-2 border-border/50 bg-card hover:border-primary/50 transition-all duration-300"
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 border border-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-xs font-semibold text-primary mb-2 tracking-wide">{useCase.label}</div>
              <h3 className="text-2xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">{useCase.description}</p>
              <p className="text-sm text-primary italic">{useCase.tagline}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
