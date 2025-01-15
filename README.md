# PNPM Monorepo with Next.js and shadcn/ui

## Overview
A modern monorepo setup powered by PNPM package manager, featuring a Next.js application with shadcn/ui components. This architecture provides a scalable and maintainable structure for building enterprise-grade web applications.

## Installation
```bash
# Clone into current directory
git clone https://github.com/alexy-os/turbo-buildy.git .

# Install dependencies
pnpm install
```

## Development
```bash
pnpm dev
```

## Build
```bash
pnpm build
```

## Start
```bash
pnpm start
```

## Tech Stack
- **Package Manager**: PNPM
- **Framework**: Next.js 14+
- **UI Components**: shadcn/ui
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
- Managed through PNPM workspace hoisting

### Workspace Setup
```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Local Package References
```json
// apps/web/package.json
{
  "dependencies": {
    "@pnpm-monorepo/ui": "workspace:*"
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
  "name": "@pnpm-monorepo/ui",
  "exports": {
    "./styles.css": "./src/styles/globals.css",
    "./tailwind.config": "./tailwind.config.js",
    "./*": "./src/components/ui/*.tsx",
    "./lib/*": "./src/lib/*"
  }
}
```

3. **Initialize shadcn/ui**
```bash
# Initialize shadcn/ui
pnpm ui:init

# Add components
pnpm ui:add button
```

## Path Aliases Usage
```typescript
// Import UI components
import { Button } from "@pnpm-monorepo/ui/button";
import { cn } from "@pnpm-monorepo/ui/lib/utils";

// Import from web application
import { Component } from "@web/components";
```

## Scripts
```json
{
  "scripts": {
    "dev": "pnpm --filter @pnpm-monorepo/web dev",
    "build": "pnpm run build:apps",
    "start": "pnpm run start:apps",
    "build:packages": "pnpm --filter @pnpm-monorepo/ui build",
    "build:apps": "pnpm --filter @pnpm-monorepo/web build",
    "start:apps": "pnpm --filter @pnpm-monorepo/web start",
    "lint": "pnpm --filter @pnpm-monorepo/web lint",
    "ui:init": "pnpm dlx shadcn@latest init --cwd packages/ui",
    "ui:add": "bash scripts/replaceImport/add-components.sh"
  }
}
```

## Best Practices
- Use workspace dependencies with `workspace:*`
- Keep shared dependencies in root package.json
- Use proper exports in packages/ui/package.json
- Maintain clear separation between app and UI package

## Common Issues & Solutions
- Dependencies are hoisted to root `node_modules`
- Use proper workspace filtering for running commands
- Make sure to use correct import paths for UI components

## Requirements
- Node.js 18+
- PNPM 8+
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
      "@pnpm-monorepo/ui": ["packages/ui/src"],
      "@pnpm-monorepo/ui/*": ["packages/ui/src/*"],
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
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@pnpm-monorepo/ui/*": ["./src/*"]
    },
    "jsx": "react-jsx",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "target": "es6",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true
  }
}
```

### Next.js App Configuration
```json
// apps/web/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "jsx": "preserve",  // Required for Next.js
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@pnpm-monorepo/ui": ["../../packages/ui/src"],
      "@pnpm-monorepo/ui/*": ["../../packages/ui/src/*"]
    }
  }
}
```

### TypeScript Setup Notes
- Root config provides base paths for monorepo
- UI package uses `react-jsx` for optimal component compilation
- Next.js app uses `preserve` for SSR optimization
- Path aliases are configured at each level for proper module resolution