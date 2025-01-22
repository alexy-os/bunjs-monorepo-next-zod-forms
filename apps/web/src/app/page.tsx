"use client"

import { Button } from "@bun-monorepo/ui/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bun-monorepo/ui/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@bun-monorepo/ui/components/ui/alert-dialog";

import { TestForm } from "@bun-monorepo/ui/components/test-form";
import { PricingPlans } from "@bun-monorepo/ui/components/PricingPlans";

import { AutoForm } from "@bun-monorepo/ui/components/ui/autoform/AutoForm";
import { z } from "zod";
import { ZodProvider } from "@autoform/zod";
 
const demoFormSchema = z.object({
  // Personal Information Section
  personalInfo: z.object({
    fullName: z.string()
      .min(2, "Name must be at least 2 characters")
      .describe("Full Name // Enter your full name"),
    email: z.string()
      .email("Invalid email address")
      .describe("Email Address // Your contact email"),
    website: z.string()
      .url("Must be a valid URL")
      .optional()
      .describe("Website // Your personal website (optional)"),
    experienceYears: z.number()
      .min(0, "Cannot be negative")
      .max(50, "Must be less than 50 years")
      .describe("Years of Experience // Your professional experience"),
    expectedSalary: z.number()
      .min(10000, "Minimum salary is 10000")
      .max(500000, "Maximum salary is 500000")
      .step(1000)
      .describe("Expected Salary // Annual salary expectation"),
  }).describe("Personal Information"),

  // Project Details
  projectDetails: z.object({
    description: z.string()
      .min(20, "Description must be at least 20 characters")
      .max(1000, "Description must not exceed 1000 characters")
      .describe("Project Description // Describe your project in detail"),
    
    projectType: z.string()
      .describe("Project Type // Select: personal, commercial, or enterprise"),

    priority: z.string()
      .describe("Priority Level // Select: low, medium, or high"),
    
    features: z.object({
      responsive: z.boolean()
        .describe("Responsive Design // Mobile-friendly layout"),
      accessibility: z.boolean()
        .describe("Accessibility // WCAG compliance"),
      darkMode: z.boolean()
        .describe("Dark Mode // Theme switching support"),
      multilingual: z.boolean()
        .describe("Multilingual // Multiple language support"),
      analytics: z.boolean()
        .describe("Analytics // Usage tracking and reporting"),
    }).describe("Project Features"),

    teamSize: z.number()
      .min(1, "Team must have at least 1 person")
      .max(100, "Team size cannot exceed 100")
      .step(1)
      .describe("Team Size // Number of team members"),

    startDate: z.coerce.date()
      .min(new Date("2000-01-01"), "Date must be after 2000")
      .max(new Date(), "Date cannot be in the future")
      .describe("Start Date // When did you start?"),
    
    agreeToTerms: z.boolean()
      .refine((val) => val === true, "You must agree to the terms")
      .describe("Terms Agreement // I agree to the terms and conditions"),
  }).describe("Project Details"),
});

const schemaProvider = new ZodProvider(demoFormSchema);

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-fade-in">
          Welcome to Bun Monorepo
        </h1>
        <p className="mt-6 text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          A modern, scalable starter template for your next project
        </p>

        {/* Components Showcase */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          {/* Buttons Section */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Interactive Components</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="shadow-lg hover:shadow-xl transition-all">
                Get Started
              </Button>
              <Button variant="secondary" className="shadow-lg hover:shadow-xl transition-all">
                Documentation
              </Button>
              <Button variant="destructive" className="shadow-lg hover:shadow-xl transition-all">
                Important Action
              </Button>
            </div>
          </section>

          {/* Alert Dialog Section */}
          <section className="space-y-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto shadow-lg hover:shadow-xl transition-all">
                  Show Dialog Example
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Welcome to Our Platform</AlertDialogTitle>
                  <AlertDialogDescription>
                    Discover the power of our component library. Build beautiful interfaces with ease.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Maybe Later</AlertDialogCancel>
                  <AlertDialogAction>Let's Start</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>

          {/* Accordion Section */}
          <section className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">Why choose our platform?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Our platform offers a comprehensive suite of tools and components,
                    making it easy to build modern web applications.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg">Features & Benefits</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Modern Component Library</li>
                    <li>Responsive Design</li>
                    <li>Easy Integration</li>
                    <li>Customizable Themes</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="mt-16 max-w-4xl mx-auto space-y-12">
            <h1 className="text-3xl font-bold mb-6">Testing two types of form</h1>
            <p className="text-gray-600 mb-8">
              This is a demonstration of AutoForm's capabilities with various field types and validations. And identify schema for the Form Builder with Zod.
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Example 1: AutoForm with Zod</h2>
            
            <AutoForm
              schema={schemaProvider}
              onSubmit={(data) => {
                console.log("Form submitted:", data);
                alert("Form submitted! Check console for data.");
              }}
            />
          </section>

          <section className="mt-16 max-w-4xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Example 2: Form Builder with Zod</h2>
            <div className="container mx-auto px-4 py-16 md:py-24">
              <TestForm />
            </div>
          </section>

          <section className="mt-16 max-w-4xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Example 3: Zod Form Builder Created Pricing Plans</h2>
            <div className="container mx-auto px-4 py-16 md:py-24">
              <PricingPlans />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
