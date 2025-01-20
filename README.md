# Bun Monorepo with Next.js and Autoform with shadcn/ui

## Overview
A modern monorepo setup powered by Bun runtime, featuring a Next.js application with shadcn/ui components and Autoform with Zod. This architecture provides a scalable and maintainable structure for building enterprise-grade web applications.

## Installation
```bash
# Clone into current directory
git clone https://github.com/alexy-os/bunjs-monorepo-next-zod-forms.git .

# Install dependencies
bun install
```

## Development
```bash
bun run dev
```

## Build
```bash
bun run build
```

## Start
```bash
bun run start
```

## Tech Stack
- **Runtime & Package Manager**: Bun
- **Framework**: Next.js 14+
- **UI Components**: shadcn/ui
- **Form Generation**: @autoform/react
- **Schema Validation**: Zod
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript

## Repository Structure
```
├── apps/
│   └── web/                 # Next.js application
│       ├── src/            # Application source code
│       └── next.config.js   # Next.js configuration
├── packages/
│   └── ui/                  # Shared UI components library
│       ├── src/            # UI components source
│       ├── next.config.js   # Required for shadcn/ui initialization
│       ├── components.json  # shadcn/ui configuration
│       └── package.json     # UI package configuration
├── package.json            # Root package configuration
└── tsconfig.json          # TypeScript configuration with path aliases
```

## Dependencies Management
The project uses a workspace-based monorepo structure with centralized dependency management:

### Root Dependencies
- All shared dependencies are installed in the root `node_modules`
- No duplicate dependencies across packages
- Managed through workspace hoisting

### Workspace Setup
```json
// package.json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

### Local Package References
```json
// apps/web/package.json
{
  "dependencies": {
    "@bun-monorepo/ui": "workspace:*"
  }
}
```

## Initial Setup
1. **Create Base Structure**
```bash
mkdir apps packages
mkdir apps/web packages/ui
```

2. **Configure Package Files**
> packages/ui/package.json
```json
{
  "name": "@bun-monorepo/ui",
  "exports": {
    ".": { "import": "./src/index.ts" },
    "./*": "./src/components/ui/*.tsx",
    "./lib/utils": "./src/lib/utils.ts"
  }
}
```

3. **Initialize shadcn/ui**
```bash
# Initialize shadcn/ui
bun run ui:init

# Add components
bun run ui:add button
```

## Path Aliases Usage
```typescript
// Import UI components
import { Button } from "@bun-monorepo/ui/button";
import { cn } from "@bun-monorepo/ui/lib/utils";

// Import from web application
import { Component } from "@web/components";
```

## Scripts
```json
{
  "scripts": {
    "dev": "bun run --cwd apps/web dev",
    "build": "bun run build:packages && bun run build:apps",
    "ui:init": "bun x shadcn@latest init --cwd packages/ui",
    "ui:add": "bun x shadcn@latest add --cwd packages/ui"
  }
}
```

## Best Practices
- Use workspace dependencies with `workspace:*`
- Keep shared dependencies in root package.json
- Use proper exports in packages/ui/package.json
- Maintain clear separation between app and UI package

## Form Handling with AutoForm and Zod
The project includes automatic form generation using AutoForm with Zod schema validation.

### Setup
```bash
# Install required dependencies
bun x shadcn@latest add https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/packages/shadcn/registry/autoform.json
```

See more at https://autoform-builder.vercel.app/docs/react/getting-started

### Usage Example
```typescript
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

// Use in your component
export default function UserForm() {
  return (
    <AutoForm
      schema={userSchema}
      onSubmit={(data) => {
        console.log(data);
      }}
      withSubmit
    />
  );
}
```

### Key Features
- **Automatic Form Generation**: Creates forms directly from Zod schemas
- **Type Safety**: Full TypeScript support with inferred types
- **Validation**: Built-in form validation using Zod
- **Integration**: Seamlessly works with shadcn/ui components
- **Customization**: Supports custom field components and layouts

### Important Notes
- AutoForm components must be used with the "use client" directive in Next.js
- Compatible with react-hook-form v7.43.9
- Supports complex form structures including nested objects and arrays

## Common Issues & Solutions
- Only `.bin` directory is created in local `node_modules` - this is expected behavior
- Dependencies are hoisted to root `node_modules`
- Use `bunx` for running local binaries
- When using AutoForm in Next.js, ensure components are marked with "use client"
- If experiencing react-hook-form compatibility issues, ensure version 7.43.9 is installed
- For form validation errors, check Zod schema definitions match your data structure

## Requirements
- Bun 1.0+
- Node.js 18+
- TypeScript 5.3+
- Next.js 14+

## License
MIT

## TypeScript Configuration
The project uses a multi-level TypeScript configuration to handle both the UI library and Next.js application:

### Root Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@bun-monorepo/ui": ["packages/ui/src"],
      "@bun-monorepo/ui/*": ["packages/ui/src/*"],
      "@web": ["apps/web/src"],
      "@web/*": ["apps/web/src/*"]
    }
  }
}
```

### UI Package Configuration
```json
// packages/ui/tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "isolatedModules": true,
    "paths": {
      "@bun-monorepo/ui/*": ["./src/*"]
    }
  }
}
```

### Next.js App Configuration
```json
// apps/web/tsconfig.json
{
  "compilerOptions": {
    "jsx": "preserve",  // Required for Next.js
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@bun-monorepo/ui": ["../../packages/ui/src"],
      "@bun-monorepo/ui/*": ["../../packages/ui/src/*"]
    }
  }
}
```

### TypeScript Setup Notes
- Root config provides base paths for monorepo
- UI package uses `react-jsx` for optimal component compilation
- Next.js app uses `preserve` for SSR optimization
- Path aliases are configured at each level for proper module resolution