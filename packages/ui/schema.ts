import { z } from "zod";

export const testSchema = z.object({
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
    
    projectType: z.string({
      required_error: "Please select project type",
      invalid_type_error: "Project type must be a string",
    })
      .describe("Project Type // Select: personal, commercial, or enterprise"),

    priority: z.string({
      required_error: "Please select priority level",
      invalid_type_error: "Priority must be a string",
    })
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