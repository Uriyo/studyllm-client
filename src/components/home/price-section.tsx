import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Hobby",
    price: 5,
    description: "Perfect for students and individual learners exploring AI-powered research.",
    features: [
      "Upload up to 50 sources per notebook",
      "Unlimited notebooks",
      "Audio overviews (up to 10 minutes)",
      "Study guides & summaries",
      "Basic collaboration",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: 10,
    description: "For professionals and teams who need advanced research capabilities.",
    features: [
      "Unlimited sources per notebook",
      "Unlimited notebooks",
      "Audio overviews (unlimited)",
      "Advanced content generation",
      "Priority AI processing",
      "Real-time collaboration",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    popular: true,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="container mx-auto px-4 py-24 bg-muted/30">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
          Simple, <span className="text-primary">Transparent Pricing</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your research needs. Start free, upgrade anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative p-8 rounded-2xl border bg-card ${
              plan.popular ? "border-primary shadow-lg shadow-primary/20" : "border-border/50"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-black text-white border border-primary/20 text-primary-foreground">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-5xl font-bold tracking-tight">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{plan.description}</p>
            </div>

            <Button
              size="lg"
              className={"w-full mb-6 bg-primary/40 text-primary-foreground border  hover:bg-primary/70 cursor-pointer"}
            >
              Get Started
            </Button>

            <div className="space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    <div className="inline-flex p-0.5 rounded-full bg-primary/10 border border-primary/20">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-muted-foreground">All plans include a 14-day free trial. No credit card required.</p>
      </div>
    </section>
  )
}
