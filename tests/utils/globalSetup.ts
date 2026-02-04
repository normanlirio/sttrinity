
import { chromium, FullConfig } from '@playwright/test';

export default async function globalSetup(config: FullConfig) {
    await initLogin();
}

async function initLogin() {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    await context.addCookies([
        {
            name: 'session-username',
            value: process.env.STANDARD || 'problem_user',
            domain: 'www.saucedemo.com',
            path: '/',
            expires: getExpiryDate()
        }
    ]);

    await context.storageState({ path: 'tests/fixture/storageState/state.json' });

    await browser.close();

}

/**
 * 
 * @returns Expiry date 24 hours from now in seconds
 */

function getExpiryDate() {
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);
    return Math.floor(expiryDate.getTime() / 1000);
}