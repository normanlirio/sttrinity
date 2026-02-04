# Test Plan for Checkout

## Scope
- Checkout Flow

## Out of Scope
- Login

## Platform

### Desktop:
- Chrome
- Firefox

### Mobile:
- iPhone 12
- iPhone 13

## Strategy
- Perform End to End tests for Checkout
- Automate using Playwright/TypeScript

## Risk Management

### Loss:
- Bypassing the login would skip regression tests
- Different login types are not tested
- Security testing is skipped
- Session checking if it's active/inactive

### Gain:
- Faster execution of tests since we do not go through UI
- We can achieve parallel testing
- We can isolate tests without dependency on UI Login


### Why Playwright?
- Asynchronous pattern (Promise) - Playwright uses JavaScript Promises and async/await, which makes it easier to handle asynchronous operations in browser automation. This allows you to write cleaner, more readable test code that naturally handles waiting for elements and actions to complete without complex callback structures.

- Fast execution - compared to selenium, it directly communicates to the browser.

- Built in parallel execution - Includes native support for running tests in parallel out of the box.
- Supports JS/TS and other languages such as Java, C#, and Python - teams can have more options instead of sticking to JS/TS.

- Auto-waiting features - You don't have to explicitly add timeouts or wait conditions in your code. Playwright automatically waits for elements to be ready before performing actions.
