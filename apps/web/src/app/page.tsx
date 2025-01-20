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

import { AutoForm } from "@bun-monorepo/ui/components/ui/autoform/AutoForm";
import { z } from "zod";
import { ZodProvider } from "@autoform/zod";
 
const mySchema = z.object({
  name: z.string(),
  age: z.coerce.number(),
  isHuman: z.boolean(),
  email: z.string().email(),
});

const schemaProvider = new ZodProvider(mySchema);

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

          <AutoForm
            schema={schemaProvider}
            onSubmit={(data, form) => {
              console.log(data);
            }}
            withSubmit
          />

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
        </div>
      </div>
    </main>
  );
}
