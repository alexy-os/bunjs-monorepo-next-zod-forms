import { z } from "zod";

export const testSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  
  email: z.string()
    .email("Invalid email address"),
  
  age: z.number()
    .min(18, "Must be at least 18 years old")
    .max(100, "Invalid age"),
  
  role: z.enum(["user", "admin"])
    .default("user"),
  
  bio: z.string()
    .min(10, "Bio must be at least 10 characters")
    .optional(),
  
  newsletter: z.boolean()
    .default(false),
}); 