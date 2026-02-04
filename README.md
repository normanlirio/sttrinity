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

### Github actions - Test Report
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

