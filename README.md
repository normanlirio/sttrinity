# St Trinity Property Group Assessment
Playwright test automation with TypeScript.

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests, headless by default
npm t

# Run tests in headed mode
npm run test:headed
```

## Github actions - Test Report

1. Create a folder `TestReport` in your computer
2. Go to Github Actions tab of the repository - https://github.com/normanlirio/sttrinity/actions
3. Click on the workflow run you want to view the results of
4. Scroll down to the Artifacts section at the bottom
5. Click on allure-report to download it as a ZIP file to the `TestReport` folder
6. Extract the ZIP file. The `allure-report` folder should now be in the `TestReport` folder.
7. Open the terminal and navigate to the `TestReport` folder.
8. Run the command:
   `npx allure open`
9. Enter `y` and let it install (if not yet installed)
10. After installation, it will automatically open the test report in a browser.

### Storage State/ Authentication Strategy
- We use Playwright's storage state to persist authenticated sessions across tests.
- All tests now go directly to the Inventory page without going through the login page
- The storage state is created before all tests through globalSetup
- When tests are already in hundreds, we save execution time by not logging in through the UI
- We don't waste execution time on repeated authentication

### Trade-offs
- Login flow not validated in every test => Mitigated by dedicated Login test suite
- Session expiration requires refresh logic => Handled in globalSetup with automatic renewal

### Solution
1. Global Setup (`globalSetup.ts`)
   - Authenticates once before test suite
   - Persists cookies, localStorage, sessionStorage to JSON
   - Validates session before saving (waits for inventory page load)
   
2. Session Reuse (`playwright.config.ts`)
   - All projects load saved state before test execution
   - Browser context initialized with authenticated session
   - Tests skip directly to business logic

## Page Object Model Pattern
- Using this pattern enables the framework to have maintainability, readability, and scalability
- It enforces Single Responsibility Principle for classes, making it easy to find reusable methods and avoid duplicate selectors


