import { defineConfig, devices } from '@playwright/test';

const ENV = process.env.ENV?.toLowerCase();

function getBaseUrl(env: string | undefined): string {
  switch (env) {
    case 'dev': return 'https://dev.saucedemo.com';
    case 'staging': return 'https://staging.saucedemo.com';
    case 'prod':
    default: return 'https://www.saucedemo.com';
  }
}

const baseUrl = getBaseUrl(ENV);

export default defineConfig({
  testDir: './tests/spec',
  tsconfig: './tsconfig.json',
  globalSetup: require.resolve('./tests/utils/globalSetup'),
  globalTeardown: require.resolve('./tests/utils/globalTeardown'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Updated reporter configuration
  reporter: [
    ['list'], // Console output
    ['html'], // HTML report
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false,
      environmentInfo: {
        Environment: ENV || 'prod',
        'Base URL': baseUrl,
      }
    }]
  ],
  
  use: {
    baseURL: baseUrl,
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
    {
      name: 'iPhone 12',
      use: {
        ...devices['iPhone 12'],
        storageState: 'tests/fixture/storageState/state.json',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
    },
    {
      name: 'iPhone 13',
      use: {
        ...devices['iPhone 13'],
        storageState: 'tests/fixture/storageState/state.json',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
    },
  ]
});