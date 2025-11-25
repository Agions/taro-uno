/**
 * Contract Test: Component API Documentation
 *
 * This test validates that all component API documentation follows the contract
 * defined in specs/001-github-page-api/contracts/component-api.yaml
 */

import { describe, test, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'

interface _ComponentAPIContract {
  id: string
  name: string
  category: string
  description: string
  platforms: string[]
  version: string
  api: {
    props: PropDefinition[]
    events: EventDefinition[]
    methods: MethodDefinition[]
    slots: SlotDefinition[]
  }
  examples: ComponentExample[]
}

interface PropDefinition {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description: string
  options?: string[]
}

interface EventDefinition {
  name: string
  description: string
  payload: string
}

interface MethodDefinition {
  name: string
  description: string
  args: PropDefinition[]
  returnType: string
}

interface SlotDefinition {
  name: string
  description: string
}

interface ComponentExample {
  title: string
  description: string
  code: string
  platform?: string
}

describe('Component API Documentation Contract Tests', () => {
  const supportedPlatforms = ['h5', 'wechat', 'alipay', 'baidu', 'bytedance', 'qq', 'react-native']
  const componentCategories = ['basic', 'form', 'layout', 'navigation', 'display', 'feedback']

  test('all component categories exist', async () => {
    for (const category of componentCategories) {
      const categoryPath = join('docs', 'components', category)
      expect(existsSync(categoryPath)).toBe(true)

      const indexFile = join(categoryPath, 'index.md')
      expect(existsSync(indexFile)).toBe(true)
    }
  })

  test('component documentation follows contract structure', async () => {
    const componentFiles = await glob('docs/components/**/*.md', {
      ignore: ['docs/components/index.md', 'docs/components/component-template.md']
    })

    expect(componentFiles.length).toBeGreaterThan(0)

    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, 'utf-8')

      // Check frontmatter exists and contains required fields
      expect(content).toMatch(/^---\s*\n/)
      expect(content).toMatch(/title:\s*.+/)
      expect(content).toMatch(/description:\s*.+/)
      expect(content).toMatch(/category:\s*.+/)

      // Check that component name is in title
      const titleMatch = content.match(/title:\s*([^\n]+)/)
      expect(titleMatch).toBeTruthy()

      if (titleMatch) {
        const title = titleMatch[1].replace(/['"]/g, '')
        expect(title).toMatch(/\w+ \w+/) // Should contain component name and type
      }
    }
  })

  test('each component has API documentation', async () => {
    const componentFiles = await glob('docs/components/**/*.md', {
      ignore: ['docs/components/index.md', 'docs/components/component-template.md', 'docs/components/*/index.md']
    })

    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, 'utf-8')

      // Check for API section
      expect(content).toMatch(/## API\s*\n/)

      // Check for Props table
      expect(content).toMatch(/### Props\s*\n/)
      expect(content).toMatch(/\| 参数 \| 说明 \|/)

      // Check for Events section (may be empty)
      expect(content).toMatch(/### Events\s*\n/)

      // Check for Methods section (may be empty)
      expect(content).toMatch(/### Methods\s*\n/)
    }
  })

  test('platform badges are present and valid', async () => {
    const componentFiles = await glob('docs/components/**/*.md', {
      ignore: ['docs/components/index.md', 'docs/components/component-template.md', 'docs/components/*/index.md']
    })

    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, 'utf-8')

      // Check for platform badge component
      if (content.includes('<PlatformBadge')) {
        // Extract platforms from badge
        const badgeMatch = content.match(/<PlatformBadge[^>]*platforms={?\[?['"]([^'"]+)['"]\]?}?/)
        if (badgeMatch) {
          const platforms = badgeMatch[1].split(',').map(p => p.trim())
          expect(platforms.length).toBeGreaterThan(0)

          // Verify all platforms are supported
          for (const platform of platforms) {
            expect(supportedPlatforms).toContain(platform)
          }
        }
      }
    }
  })

  test('examples are properly formatted', async () => {
    const componentFiles = await glob('docs/components/**/*.md', {
      ignore: ['docs/components/index.md', 'docs/components/component-template.md', 'docs/components/*/index.md']
    })

    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, 'utf-8')

      // Check for usage examples
      expect(content).toMatch(/## 使用示例|## 使用场景|### 基础用法/)

      // Check for code blocks
      expect(content).toMatch(/```tsx?/)

      // Verify code blocks contain imports
      const codeBlocks = content.match(/```tsx?\n([\s\S]*?)```/g) || []
      for (const block of codeBlocks) {
        const code = block.replace(/```tsx?\n/, '').replace(/```$/, '')
        // Should have import statement
        expect(code).toMatch(/import.*from ['"]@taro-uno\/ui['"]/)
      }
    }
  })

  test('cross-platform compatibility documentation', async () => {
    const componentFiles = await glob('docs/components/**/*.md', {
      ignore: ['docs/components/index.md', 'docs/components/component-template.md', 'docs/components/*/index.md']
    })

    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, 'utf-8')

      // Check for cross-platform section
      expect(content).toMatch(/## 跨平台兼容性|### 平台差异/)

      // Check for platform table
      expect(content).toMatch(/\| 平台 \| 支持情况 \|/)

      // Should mention all supported platforms
      for (const platform of supportedPlatforms) {
        expect(content).toMatch(new RegExp(platform, 'i'))
      }
    }
  })

  test('performance information is documented', async () => {
    const componentFiles = await glob('docs/components/**/*.md', {
      ignore: ['docs/components/index.md', 'docs/components/component-template.md', 'docs/components/*/index.md']
    })

    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, 'utf-8')

      // Check for performance section
      expect(content).toMatch(/## 性能特性|### 性能优化/)

      // Check for performance metrics
      expect(content).toMatch(/渲染时间|包体积|100ms|50KB/)

      // Check for performance badge or indicator
      expect(content).toMatch(/performance-badge|性能/)
    }
  })

  test('theme customization is documented', async () => {
    const componentFiles = await glob('docs/components/**/*.md', {
      ignore: ['docs/components/index.md', 'docs/components/component-template.md', 'docs/components/*/index.md']
    })

    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, 'utf-8')

      // Check for theme section
      expect(content).toMatch(/## 主题定制|### CSS 变量/)

      // Check for CSS variables
      expect(content).toMatch(/--[\w-]+:\s*[\w#]+/)

      // Check for theme configuration example
      expect(content).toMatch(/```css|```typescript/)
    }
  })

  test('FAQ section exists', async () => {
    const componentFiles = await glob('docs/components/**/*.md', {
      ignore: ['docs/components/index.md', 'docs/components/component-template.md', 'docs/components/*/index.md']
    })

    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, 'utf-8')

      // Check for FAQ section
      expect(content).toMatch(/## 常见问题/)

      // Check for Q&A format
      expect(content).toMatch(/### Q:|**Q:|Q:/)
      expect(content).toMatch(/### A:|**A:|A:/)
    }
  })

  test('component has proper navigation links', async () => {
    const componentFiles = await glob('docs/components/**/*.md', {
      ignore: ['docs/components/index.md', 'docs/components/component-template.md', 'docs/components/*/index.md']
    })

    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, 'utf-8')

      // Check for related components section
      expect(content).toMatch(/## 相关组件/)

      // Check for navigation links
      expect(content).toMatch(/\[.*\]\(\.\./)

      // Links should point to other components
      const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []
      expect(links.length).toBeGreaterThan(0)

      for (const link of links) {
        const match = link.match(/\[([^\]]+)\]\(([^)]+)\)/)
        if (match) {
          const href = match[2]
          if (href.startsWith('../')) {
            // Should be a relative link to another component
            expect(href).toMatch(/\.\.\/[^/]+\/[^/]+\/?$/)
          }
        }
      }
    }
  })

  test('API documentation completeness', async () => {
    const componentFiles = await glob('docs/components/**/*.md', {
      ignore: ['docs/components/index.md', 'docs/components/component-template.md', 'docs/components/*/index.md']
    })

    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, 'utf-8')

      // Extract component name from file path
      const _componentName = filePath.split('/').pop()?.replace('.md', '') || ''

      // Props table should have proper headers
      expect(content).toMatch(/\| 参数 \| 说明 \| 类型 \| 默认值 \| 必填 \|/)

      // Events table should have proper headers
      expect(content).toMatch(/\| 事件名 \| 说明 \| 参数类型 \| 回调参数 \|/)

      // Methods table should have proper headers
      expect(content).toMatch(/\| 方法名 \| 说明 \| 参数 \| 返回值 \|/)

      // Check for TypeScript code examples
      expect(content).toMatch(/```typescript?\s*import.*from.*@taro-uno\/ui/)
    }
  })

  test('component version information', async () => {
    const componentFiles = await glob('docs/components/**/*.md', {
      ignore: ['docs/components/index.md', 'docs/components/component-template.md', 'docs/components/*/index.md']
    })

    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, 'utf-8')

      // Check for version in frontmatter
      expect(content).toMatch(/version:\s*['"]?\d+\.\d+\.\d+['"]?/)

      // Check for changelog section
      expect(content).toMatch(/## 更新日志|### \d+\.\d+\.\d+/)

      // Changelog should have version numbers
      expect(content).toMatch(/\d+\.\d+\.\d+/)
    }
  })
})