# SauceDemo_Playwright
This includes the assignment for web automation of the sauce demo application using Playwright Typescript.

Install Playwright
# Install Playwright with TypeScript support
npm init playwright@latest

During initialization, choose:

TypeScript (Yes)

Tests folder (tests or e2e)

GitHub Actions (Optional)

Project Structure
After setup, your project should look like:
playwright-ts-tests/
├── tests/
│   └── example.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── node_modules/

##Running Tests
Basic Commands

# Run all tests
npx playwright test

# Run tests in headed mode (show browser)
npx playwright test --headed

# Run tests in a specific browser
npx playwright test --project=chromium

# Run a specific test file
npx playwright test tests/login.spec.ts


##Reporting
View HTML Report
bash
# Run tests and open report
npx playwright test
npx playwright show-report