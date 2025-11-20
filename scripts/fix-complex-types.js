#!/usr/bin/env node

/**
 * Selectively fix type definition parameters in complex .types.ts files
 * Only modifies function type signatures, not implementations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Files to process (with function implementations)
const files = [
  'src/components/form/Slider/Slider.types.ts',
  'src/components/form/Cascader/Cascader.types.ts',  
  'src/components/navigation/Tree/Tree.types.ts',
  'src/components/feedback/Notification/Notification.types.ts',
  'src/components/feedback/Result/Result.types.ts'
];

let totalFixed = 0;

files.forEach((file) => {
  const filePath = path.join(projectRoot, file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} not found, skipping`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Pattern: callback/event handler parameters in interface definitions
  // Example: onChange?: (value: string) => void;
  // Should become: onChange?: (_value: string) => void;
  
  // Match only in interface/type definitions (before implementation sections)
  const lines = content.split('\n');
  let inImplementation = false;
  let modified = false;
  
  const processedLines = lines.map((line, index) => {
    // Detect start of implementation (static class or export const)
    if (line.match(/^export (class|const)\s+\w+.*=/)) {
      inImplementation = true;
    }
    
    // Only modify type definition lines, not implementations
    if (!inImplementation) {
      // Pattern for callback parameters: onChange?: (param: Type)
      const callbackPattern = /^(\s+\w+\??):\s*\(([a-z][a-zA-Z0-9]*)(:\s)/g;
      
      if (callbackPattern.test(line)) {
        const newLine = line.replace(
          /^(\s+\w+\??):\s*\(([a-z][a-zA-Z0-9]*)(:\s)/g,
          '$1: (_$2$3'
        );
        if (newLine !== line) {
          modified = true;
          return newLine;
        }
      }
    }
    
    return line;
  });
  
  if (modified) {
    content = processedLines.join('\n');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed ${file}`);
    totalFixed++;
  } else {
    console.log(`○ ${file} - no changes needed  `);
  }
});

console.log(`\n✅ Processed ${files.length} files, modified ${totalFixed}`);
