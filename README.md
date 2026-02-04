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

1. Create a folder in Documents
2. Go to the repository on GitHub
3. Click on the Actions tab
4. Click on the workflow run you want to view
5. Scroll down to the Artifacts section at the bottom
6. Click on allure-report to download it as a ZIP file
7. Move the downloaded artifact to the folder that was created in step 1
8. Extract the ZIP file
9. Open terminal and navigate inside the extracted allure-report folder
10. Run the command:
   `npx allure open allure-report`
11. Enter `y` and let it install (if not yet installed)


### Storage State/ Authentication Strategy
- We use Playwright's storage state to persist authenticated sessions across tests.
- All tests now go directly to the Inventory page without going through the login page
- The storage state is created before all tests through globalSetup
- When tests are already in hundreds, we save execution time by not going through UI
- We don't waste execution time on repeated authentication


### Trade-offs
- Login flow not validated in every test => Mitigated by dedicated auth test suite
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


