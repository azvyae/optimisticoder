import { defineConfig } from 'cypress';
import 'dotenv/config';
export default defineConfig({
  videosFolder: 'tests/videos',
  fixturesFolder: 'tests/fixtures',
  downloadsFolder: 'tests/downloads',
  screenshotsFolder: 'tests/screenshots',
  viewportWidth: 1280,
  viewportHeight: 720,
  scrollBehavior: 'center',
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/e2e/**/*.cy.ts',
    supportFile: 'tests/support/e2e.ts',
    setupNodeEvents(on, config) {
      config.env = {
        ...process.env,
        ...config.env,
      };
      return config;
    },
  },

  component: {
    indexHtmlFile: 'tests/support/component-index.html',
    supportFile: 'tests/support/component.ts',
    specPattern: 'tests/components/**/*.cy.tsx',
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
