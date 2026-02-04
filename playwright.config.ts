import { defineConfig, devices } from '@playwright/test';

const ENV = process.env.ENV?.toLowerCase();

function getBaseUrl(env: string | undefined): string {
    switch (env) {
        case 'dev':     return 'https://dev.saucedemo.com';
        case 'staging': return 'https://staging.saucedemo.com';
        case 'prod':
        default:        return 'https://www.saucedemo.com';
    }
}

const baseUrl = getBaseUrl(ENV);

export default defineConfig({
  testDir: './tests/spec',
  tsconfig: './tsconfig.json',
  globalSetup: require.resolve('./tests/utils/globalSetup'),
  globalTeardown: require.resolve('./tests/utils/globalTeardown'),
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
     baseURL: baseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/fixture/storageState/state.json',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },

    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'tests/fixture/storageState/state.json',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
    },
  ]

});
