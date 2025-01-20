"use client";

import { AutoForm } from "@workspace/ui/components/autoform/AutoForm";
import { ZodProvider } from "@autoform/zod";
import { z } from "zod";

const mySchema = z.object({
  name: z.string(),
  age: z.coerce.number(),
  isHuman: z.boolean(),
});

const schemaProvider = new ZodProvider(mySchema);
 
export default function FormPage() {
  return (
    <div className="container mx-auto p-4">
      <AutoForm
        schema={schemaProvider}
        onSubmit={(data) => {
          console.log(data);
        }}
        withSubmit
      />
    </div>
  );
}