import { test as base } from '@playwright/test';
import PageManager from '../../utils/PageManager';

type Fixtures = {
    pm: PageManager;
};

export const test = base.extend<Fixtures>({
    pm: async ({ page }, use) => {
        await page.goto('/inventory.html');
        const pageManager = new PageManager(page);
        await use(pageManager);
    },
});

export { expect } from '@playwright/test';