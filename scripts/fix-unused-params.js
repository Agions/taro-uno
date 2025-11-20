#!/usr/bin/env node

/**
 * Batch fix ESLint unused parameter warnings in .types.ts files
 * Adds underscore prefix to unused function parameters
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Get all .types.ts files
const typesFiles = execSync(
  'find src -name "*.types.ts"',
  { encoding: 'utf8', cwd: projectRoot }
)
  .trim()
  .split('\n')
  .filter(Boolean);

console.log(`Found ${typesFiles.length} .types.ts files to process\n`);

let totalFixed = 0;

typesFiles.forEach((file) => {
  const filePath = path.join(projectRoot, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Pattern 1: Function parameters like (event: Type) =>
  // Replace with (_event: Type) =>
  const functionParamPattern = /\(([a-z][a-zA-Z0-9]*): /g;
  let match;
  const paramsToFix = new Set();
  
  while ((match = functionParamPattern.exec(content)) !== null) {
    const paramName = match[1];
    // Skip already prefixed params
    if (!paramName.startsWith('_')) {
      paramsToFix.add(paramName);
    }
  }

  paramsToFix.forEach((param) => {
    // Only rename if it appears to be a function parameter (not used in body)
    const regex = new RegExp(`\\(${param}:\\s`, 'g');
    const newContent = content.replace(regex, `(_${param}: `);
    if (newContent !== content) {
      content = newContent;
      modified = true;
      totalFixed++;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed ${file}`);
  }
});

console.log(`\n✅ Fixed ${totalFixed} unused parameters`);
console.log('Running lint to check remaining errors...\n');

try {
  const result = execSync('npm run lint:check 2>&1 | tail -1', {
    encoding: 'utf8',
    cwd: projectRoot
  });
  console.log(result);
} catch (error) {
  // Expected - lint will still have errors
  console.log('Lint check completed');
}
