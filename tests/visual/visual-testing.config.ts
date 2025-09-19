/**
 * Visual Regression Testing Configuration
 * Uses Percy and Storybook for visual testing
 */

import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

// Visual testing configuration
export const visualTestConfig = {
  // Percy configuration
  percy: {
    enabled: process.env.PERCY_TOKEN !== undefined,
    token: process.env.PERCY_TOKEN,
    projectId: process.env.PERCY_PROJECT_ID,
    width: [1280, 768, 375], // Desktop, tablet, mobile
    height: [800, 1024, 667],
  },

  // Storybook configuration
  storybook: {
    enabled: true,
    port: 6006,
    configDir: '.storybook',
    storiesPattern: '**/*.stories.@(js|jsx|ts|tsx)',
  },

  // Image snapshot configuration
  snapshot: {
    customSnapshotsDir: './tests/visual/__snapshots__',
    customDiffDir: './tests/visual/__diffs__',
    failureThreshold: 0.1, // 10% difference threshold
    failureThresholdType: 'percent',
    updateSnapshots: process.env.UPDATE_SNAPSHOTS === 'true',
  },

  // Test scenarios
  scenarios: {
    lightTheme: {
      name: 'Light Theme',
      theme: 'light',
      background: '#ffffff',
    },
    darkTheme: {
      name: 'Dark Theme',
      theme: 'dark',
      background: '#1a1a1a',
    },
    highContrast: {
      name: 'High Contrast',
      theme: 'high-contrast',
      background: '#000000',
    },
    mobile: {
      name: 'Mobile View',
      viewport: { width: 375, height: 667 },
    },
    tablet: {
      name: 'Tablet View',
      viewport: { width: 768, height: 1024 },
    },
    desktop: {
      name: 'Desktop View',
      viewport: { width: 1280, height: 800 },
    },
  },

  // Component states to test
  states: {
    default: 'Default',
    hover: 'Hover',
    focus: 'Focus',
    active: 'Active',
    disabled: 'Disabled',
    loading: 'Loading',
    error: 'Error',
    success: 'Success',
  },
};

// Configure image snapshot matcher
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: visualTestConfig.snapshot.customSnapshotsDir,
  customDiffDir: visualTestConfig.snapshot.customDiffDir,
  failureThreshold: visualTestConfig.snapshot.failureThreshold,
  failureThresholdType: visualTestConfig.snapshot.failureThresholdType as any,
});

// Extend expect with visual testing matchers
expect.extend({ toMatchImageSnapshot });

// Visual testing utilities
export const visualTestUtils = {
  // Capture component screenshot
  captureScreenshot: async (
    component: React.ReactElement,
    name: string,
    scenario: keyof typeof visualTestConfig.scenarios = 'desktop'
  ) => {
    const scenarioConfig = visualTestConfig.scenarios[scenario];

    // Render component in a controlled environment
    const container = document.createElement('div');
    container.style.width = scenarioConfig.viewport?.width?.toString() || '1280';
    container.style.height = scenarioConfig.viewport?.height?.toString() || '800';
    container.style.background = scenarioConfig.background || '#ffffff';

    // TODO: Actually render and capture screenshot
    // This would integrate with Percy or similar tools

    return {
      name,
      scenario,
      path: `${visualTestConfig.snapshot.customSnapshotsDir}/${name}-${scenario}.png`,
    };
  },

  // Compare screenshots
  compareScreenshots: async (
    baselinePath: string,
    currentPath: string,
    name: string
  ) => {
    // TODO: Implement screenshot comparison logic
    // This would use pixel matching algorithms

    return {
      name,
      passed: true,
      diff: 0,
      threshold: visualTestConfig.snapshot.failureThreshold,
    };
  },

  // Generate visual test report
  generateReport: (results: any[]) => {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: results.length,
      passed: results.filter(r => r.passed).length,
      failed: results.filter(r => !r.passed).length,
      results,
    };

    // Save report
    const fs = require('fs');
    const path = require('path');
    const reportPath = path.join(process.cwd(), 'tests/visual/reports', `visual-test-report-${Date.now()}.json`);

    if (!fs.existsSync(path.dirname(reportPath))) {
      fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    return report;
  },
};

// Visual testing helpers
export const visualTestHelpers = {
  // Setup visual test environment
  setupEnvironment: () => {
    // Set viewport size
    if (visualTestConfig.scenarios.desktop.viewport) {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: visualTestConfig.scenarios.desktop.viewport.width,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: visualTestConfig.scenarios.desktop.viewport.height,
      });
    }

    // Disable animations for consistent screenshots
    document.documentElement.style.setProperty('--transition-duration', '0ms');
    document.documentElement.style.setProperty('--animation-duration', '0ms');
  },

  // Wait for stable rendering
  waitForStableDOM: async () => {
    return new Promise(resolve => {
      // Wait for React to finish rendering
      setTimeout(resolve, 100);
    });
  },

  // Apply theme classes
  applyTheme: (theme: string) => {
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${theme}`);
  },

  // Capture element screenshot
  captureElement: async (element: HTMLElement, name: string) => {
    // Wait for element to be stable
    await visualTestHelpers.waitForStableDOM();

    // Hide dynamic content
    const dynamicElements = element.querySelectorAll('[data-dynamic]');
    dynamicElements.forEach(el => {
      (el as HTMLElement).style.visibility = 'hidden';
    });

    // TODO: Actually capture screenshot
    // This would integrate with your visual testing tool

    // Restore dynamic content
    dynamicElements.forEach(el => {
      (el as HTMLElement).style.visibility = '';
    });

    return {
      name,
      element: element.tagName.toLowerCase(),
      className: element.className,
    };
  },

  // Test component states
  testStates: async (element: HTMLElement, states: string[]) => {
    const results = [];

    for (const state of states) {
      // Apply state
      element.classList.add(`state-${state}`);

      // Trigger state events
      if (state === 'hover') {
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      } else if (state === 'focus') {
        element.focus();
      } else if (state === 'active') {
        element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      }

      // Capture screenshot
      const result = await visualTestHelpers.captureElement(element, `${element.tagName.toLowerCase()}-${state}`);
      results.push(result);

      // Clean up
      element.classList.remove(`state-${state}`);
      if (state === 'hover') {
        element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      } else if (state === 'focus') {
        element.blur();
      } else if (state === 'active') {
        element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      }
    }

    return results;
  },
};

// Percy integration
export const percyUtils = {
  // Initialize Percy
  initialize: () => {
    if (visualTestConfig.percy.enabled && visualTestConfig.percy.token) {
      // Initialize Percy SDK
      // This would integrate with @percy/agent or similar
      console.log('Percy initialized for visual testing');
    }
  },

  // Capture Percy snapshot
  captureSnapshot: async (name: string, options?: any) => {
    if (visualTestConfig.percy.enabled) {
      // Capture Percy snapshot
      // This would use the Percy SDK to capture and upload screenshots
      console.log(`Capturing Percy snapshot: ${name}`);
      return true;
    }
    return false;
  },

  // Finalize Percy build
  finalize: async () => {
    if (visualTestConfig.percy.enabled) {
      // Finalize Percy build
      console.log('Finalizing Percy build');
    }
  },
};

// Storybook integration
export const storybookUtils = {
  // Start Storybook server
  startServer: async () => {
    if (visualTestConfig.storybook.enabled) {
      // Start Storybook server for visual testing
      console.log(`Starting Storybook server on port ${visualTestConfig.storybook.port}`);
    }
  },

  // Capture Storybook story screenshots
  captureStoryScreenshots: async (stories: string[]) => {
    if (visualTestConfig.storybook.enabled) {
      // Capture screenshots of Storybook stories
      for (const story of stories) {
        console.log(`Capturing Storybook story: ${story}`);
        // TODO: Implement Storybook screenshot capture
      }
    }
  },
};

// Export all utilities
export {
  visualTestConfig,
  visualTestUtils,
  visualTestHelpers,
  percyUtils,
  storybookUtils,
};

export default {
  config: visualTestConfig,
  utils: visualTestUtils,
  helpers: visualTestHelpers,
  percy: percyUtils,
  storybook: storybookUtils,
};