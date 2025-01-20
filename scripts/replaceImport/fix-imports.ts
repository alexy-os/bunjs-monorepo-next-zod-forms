import { glob } from 'glob'
import fs from 'fs/promises'

const SEARCH_PATTERN = '@bun-monorepo/lib/utils'
const REPLACE_PATTERN = '@bun-monorepo/ui/lib/utils'
const componentsPath = 'packages/ui/src/components/ui'

async function fixImports(components: string[]) {
  try {
    // If components are not passed, exit
    if (!components.length) {
      console.log('No components specified')
      return
    }

    // Create patterns for each component
    const filePatterns = components.map(
      component => `${componentsPath}/${component}.{ts,tsx}`
    )
    
    // Get all files for specified components
    const files = await glob(filePatterns)
    
    if (files.length === 0) {
      console.log('No matching files found')
      return
    }

    let fixedCount = 0
    for (const file of files) {
      const content = await fs.readFile(file, 'utf-8')
      
      if (content.includes(SEARCH_PATTERN)) {
        const updatedContent = content.replace(
          new RegExp(SEARCH_PATTERN.replace('/', '\\/'), 'g'),
          REPLACE_PATTERN
        )
        
        await fs.writeFile(file, updatedContent, 'utf-8')
        console.log(`✓ Fixed imports in ${file}`)
        fixedCount++
      }
    }
    
    console.log(`Import paths updated in ${fixedCount} files!`)
  } catch (error) {
    console.error('Error fixing imports:', error)
    process.exit(1)
  }
}

// Get components from command line arguments
const components = process.argv.slice(2)
fixImports(components) 