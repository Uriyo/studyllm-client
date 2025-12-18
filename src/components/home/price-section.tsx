"use client"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useUser} from "@clerk/nextjs"
import { useState } from "react"
import { useAuth} from "@clerk/nextjs"

type Plan = {
  name: string
  price: number
  description: string
  priceId?: string // only for paid plans
  features: string[]
  popular?: boolean
}

const plans:Plan[] = [
  {
    name: "Free",
    price:0,
    description:"A simple way to try out AI-powered research and see how it fits your workflow.",
    features: [
      "Upload up to 5 sources per notebook",
      "Up to 3 notebooks",
      "Basic AI responses"
    ],
},
  {
    name: "Hobby",
    price: 5,
    priceId: "price_1Sfi6LSC6OSw12xOJIdFTYKk",
    description: "Perfect for students and individual learners exploring AI-powered research.",
    features: [
      "Upload up to 50 sources per notebook",
      "Unlimited notebooks",
      "Study guides & summaries",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: 10,
    priceId: "price_1Sfi6pSC6OSw12xOTbyvt0dN",
    description: "For professionals and teams who need advanced research capabilities.",
    features: [
      "Unlimited sources per notebook",
      "Unlimited notebooks",
      "Audio overviews (unlimited)",
      "Advanced content generation",
      "Priority AI processing",
      "Advanced analytics",
      "Priority support",
    ],
    popular: true,
  },
]



export function PricingSection() {
  const router = useRouter()
  const { user } = useUser()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const { getToken } = useAuth()

  const handleSubscribe = async (plan:Plan) => {
    if (!user) {
      router.push("/sign-up")
      return
    }
     if (!plan.priceId) {
      router.push("/projects")
      return
    }
  try{
    setLoadingPlan(plan.name)
    const token = await getToken()
    const email=user.primaryEmailAddress?.emailAddress

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({price_id: plan.priceId, email: email }),
        }
      )
      if (!res.ok) {
        throw new Error("Failed to create checkout session")
      }
      const data = await res.json()
      window.location.href = data.url
  }catch(err){
    console.log(err)
    throw new Error("Failed to create checkout session")
  }finally{
    setLoadingPlan(null)
  }
}

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

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
              disabled={loadingPlan === plan.name}
              onClick={() =>  handleSubscribe(plan)}
              className="w-full mb-6 bg-primary/40 text-primary-foreground border  hover:bg-primary/70 cursor-pointer"
            >
              {loadingPlan === plan.name
                ? "Redirecting..."
                : plan.price === 0
                ? "Get Started"
                : "Get Started"}
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
