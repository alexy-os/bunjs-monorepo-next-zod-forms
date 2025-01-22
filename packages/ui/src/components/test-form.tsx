"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { testSchema } from "../../schema";
import { Input } from './ui/input';
import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@bun-monorepo/ui/components/ui/popover";
import { cn } from "@bun-monorepo/ui/lib/utils";
import { CalendarIcon } from "lucide-react";
import type { CheckedState } from "@radix-ui/react-checkbox";

type FormData = z.infer<typeof testSchema>;

type FeatureKey = keyof FormData['projectDetails']['features'];

export function TestForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(testSchema),
        defaultValues: {
            personalInfo: {
                experienceYears: 0,
                expectedSalary: 10000,
            },
            projectDetails: {
                features: {
                    responsive: false,
                    accessibility: false,
                    darkMode: false,
                    multilingual: false,
                    analytics: false,
                },
                teamSize: 1,
            },
        },
    });

    function onSubmit(data: FormData) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    
                    <FormField
                        control={form.control}
                        name="personalInfo.fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="personalInfo.email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="personalInfo.website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input {...field} type="url" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="personalInfo.experienceYears"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Years of Experience</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        {...field} 
                                        onChange={e => field.onChange(parseInt(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="personalInfo.expectedSalary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expected Salary</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        step={1000}
                                        {...field} 
                                        onChange={e => field.onChange(parseInt(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Project Details</h3>

                    <FormField
                        control={form.control}
                        name="projectDetails.description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Description</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        {...field} 
                                        rows={5}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="projectDetails.teamSize"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Team Size</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        min={1}
                                        max={100}
                                        {...field} 
                                        onChange={e => field.onChange(parseInt(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="projectDetails.startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("2000-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Features Checkboxes */}
                    <div className="space-y-2">
                        <FormLabel htmlFor="features">Project Features</FormLabel>
                        {(Object.entries({
                            responsive: "Responsive Design",
                            accessibility: "Accessibility",
                            darkMode: "Dark Mode",
                            multilingual: "Multilingual",
                            analytics: "Analytics",
                        }) as [FeatureKey, string][]).map(([key, label]) => (
                            <FormField
                                key={key}
                                control={form.control}
                                name={`projectDetails.features.${key}` as `projectDetails.features.${FeatureKey}`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                id={`features-${key}`}
                                                checked={field.value as CheckedState}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel 
                                            htmlFor={`features-${key}`} 
                                            className="font-normal"
                                        >
                                            {label}
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>

                    {/* Terms Checkbox */}
                    <FormField
                        control={form.control}
                        name="projectDetails.agreeToTerms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        id="terms"
                                        checked={field.value as CheckedState}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel 
                                    htmlFor="terms" 
                                    className="font-normal"
                                >
                                    I agree to the terms and conditions
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
