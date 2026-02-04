
# Test Plan: SauceDemo Checkout Flow

## Purpose

To verify that the SauceDemo Checkout flow meets business and user requirements and behaves as expected.

## Scope of Testing

### In Scope

- Checkout flow
- Add to Cart
- Total cost computation

### Out of Scope:

- Login
- Logout
- Products List / Inventory
- Product Details
- Different types of customer/user
- Reset App State
- Menu

  

## Test Objectives

- Verify customer can complete the checkout process
- Validate the computation of total price to pay
- Ensure cross-browser compatibility

## Testing Approach

### Methodologies
- Manual
- Automated

### Types of Testing
- Functional / End-to-End Testing
- Regression
- Usability

### Tools Used
- Playwright/Typescript

## Test Environment

#### Desktop
- Chrome
- Firefox
#### Mobile
- iPhone 12
- iPhone 13

### Staging URL
https://www.saucedemo.com/

### Test Data Sources
SauceDemo Login page

## Risk Management
**Risk**
Current automated test suite takes too long to run.

**Mitigation Strategy**
Implement a utility that injects the user session directly into the browser context to eliminate the need to login before each test.
We can create a separate test suite specifically for Login so that we don't lose test coverage and at the same time, it allows the Checkout Flow test suite to run more efficiently.

**Loss**
- Bypassing the login would skip regression tests
- Different login types are not tested
- Security testing is skipped
- Session checking if it's active/inactive

**Gain**
- Faster execution of tests since we do not go through UI
- We can achieve parallel testing
- We can isolate tests without dependency on UI Login

## Why Playwright?

**Asynchronous pattern (Promise)**
Playwright uses JavaScript Promises and async/await, which makes it easier to handle asynchronous operations in browser automation. This allows you to write cleaner, more readable test code that naturally handles waiting for elements and actions to complete without complex callback structures.

**Fast execution**
Compared to selenium, it directly communicates to the browser.

**Built in parallel execution**
Includes native support for running tests in parallel out of the box.

**Supports JS/TS and other languages such as Java, C#, and Python**
Teams can have more options than Javascript.

**Auto-waiting features**
You don't have to explicitly add timeouts or wait conditions in your code. Playwright automatically waits for elements to be ready before performing actions.