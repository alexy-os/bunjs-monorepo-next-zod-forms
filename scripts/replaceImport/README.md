# Import Path Replacement Script

This utility script automatically fixes import paths in shadcn-ui components after installation in a monorepo setup.

## The Problem

When installing shadcn-ui components in a monorepo structure using `@bun-monorepo` workspace, the components are generated with incorrect import paths:

```typescript
// Generated incorrect import
import { cn } from "@bun-monorepo/ui/lib/utils"

// Required correct import
import { cn } from "@bun-monorepo/ui/lib/utils"
```

Despite multiple attempts to configure Next.js and monorepo settings properly, we couldn't achieve the correct import paths out of the box. This script serves as a temporary solution while we investigate the root cause.

## Usage

1. Install components using the custom script:

```bash
bun run ui:add button dialog alert
```

This command will:
- Install the specified shadcn components using `shadcn-ui` CLI
- Automatically fix import paths in the newly installed component files

2. The script only processes files in the specified component directories:
```
packages/ui/components/ui/<component-name>/**/*.{ts,tsx}
```

## How It Works

1. `add-components.sh` executes the shadcn installation command and passes the component names to the TypeScript script
2. `fix-imports.ts` then:
   - Locates the newly installed component files
   - Replaces incorrect import paths with the correct ones
   - Reports the number of fixed files

## Contributing

If you know how to properly configure Next.js in a monorepo to generate correct import paths for shadcn-ui components by default, please create an issue with your solution.

The ideal solution would eliminate the need for this script entirely.

## Technical Details

- Uses `glob` for efficient file pattern matching
- Processes only specified component directories to minimize scope
- Performs async file operations for better performance
- Includes error handling and informative console output

## Installation

1. Ensure the script is executable:
```bash
chmod +x scripts/replaceImport/add-components.sh
```

2. Add to your package.json:
```json
{
  "scripts": {
    "ui:add": "bash scripts/replaceImport/add-components.sh"
  }
}
```

3. Install dependencies:
```bash
bun add -D glob
```

## Known Limitations

- This is a workaround, not a proper solution
- Only fixes imports for newly installed components
- Requires manual execution when adding new components
```
