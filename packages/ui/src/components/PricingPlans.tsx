// pricing-plans.tsx
import { z } from "zod";
import { Button } from "@bun-monorepo/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@bun-monorepo/ui/components/ui/card";
import { Check } from "lucide-react";

// Define a schema for a single function
const featureSchema = z.object({
  id: z.string(),
  name: z.string(),
  included: z.boolean(),
});

// Schema for a pricing plan
const pricingPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.object({
    amount: z.number(),
    currency: z.enum(["USD", "EUR", "RUB"]),
    period: z.enum(["month", "year"]),
  }),
  features: z.array(featureSchema),
  buttonText: z.string(),
  highlighted: z.boolean().default(false),
});

// Schema for an array of plans
const pricingPlansSchema = z.array(pricingPlanSchema);

// Types based on schemas
type Feature = z.infer<typeof featureSchema>;
type PricingPlan = z.infer<typeof pricingPlanSchema>;

// Constants with data (readonly to prevent mutations)
const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    description: "Ideal for beginners",
    price: {
      amount: 0,
      currency: "USD",
      period: "month",
    },
    features: [
      { id: "f1", name: "Up to 3 projects", included: true },
      { id: "f2", name: "Up to 5 users", included: true },
      { id: "f3", name: "Basic support", included: true },
      { id: "f4", name: "Advanced analytics", included: false },
      { id: "f5", name: "Priority support", included: false },
    ],
    buttonText: "Start for free",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams",
    price: {
      amount: 15,
      currency: "USD",
      period: "month",
    },
    features: [
      { id: "f1", name: "Up to 10 projects", included: true },
      { id: "f2", name: "Up to 20 users", included: true },
      { id: "f3", name: "Basic support", included: true },
      { id: "f4", name: "Advanced analytics", included: true },
      { id: "f5", name: "Priority support", included: false },
    ],
    buttonText: "Start Pro",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: {
      amount: 49,
      currency: "USD",
      period: "month",
    },
    features: [
      { id: "f1", name: "Unlimited projects", included: true },
      { id: "f2", name: "Unlimited users", included: true },
      { id: "f3", name: "Basic support", included: true },
      { id: "f4", name: "Advanced analytics", included: true },
      { id: "f5", name: "Priority support", included: true },
    ],
    buttonText: "Contact us",
    highlighted: false,
  },
] as const;

// Function to format the price
const formatPrice = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

// Component to display a feature
const FeatureItem = ({ feature }: { feature: Feature }) => (
  <div className="flex items-center space-x-2">
    <Check className={feature.included ? "text-green-500" : "text-gray-300"} size={16} />
    <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
      {feature.name}
    </span>
  </div>
);

// Main component
export function PricingPlans() {
  // Data validation on initialization
  const validatedPlans = pricingPlansSchema.parse(PRICING_PLANS);

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {validatedPlans.map((plan) => (
          <Card 
            key={plan.id}
            className={`flex flex-col ${
              plan.highlighted 
                ? "border-primary shadow-lg scale-105" 
                : ""
            }`}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  {formatPrice(plan.price.amount, plan.price.currency)}
                </span>
                <span className="text-muted-foreground">
                  /{plan.price.period}
                </span>
              </div>
              <div className="space-y-2">
                {plan.features.map((feature) => (
                  <FeatureItem key={feature.id} feature={feature} />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}