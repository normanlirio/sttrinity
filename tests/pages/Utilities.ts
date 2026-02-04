import { Page } from "@playwright/test";


export class Utilities {

    static readonly SELECTORS = {
        burgerMenuButton: '#react-burger-menu-btn',
        cartIcon: 'a[data-test="shopping-cart-link"]',
        logoutButton: 'a[data-test="logout-sidebar-link"]',
    } as const;

    constructor(protected page: Page) { }

    get burgerMenuButton() {
        return this.page.locator(Utilities.SELECTORS.burgerMenuButton);
    }

    get cartIcon() {
        return this.page.locator(Utilities.SELECTORS.cartIcon);
    }

    get logoutButton() {
        return this.page.locator(Utilities.SELECTORS.logoutButton);
    }

    async getCartBadgeText() {
        return await this.cartIcon.textContent()
    }

    async clickCartIcon() {
        await this.cartIcon.click();
    }

    async clickBurgerMenuButton() {
        await this.burgerMenuButton.click();
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }
}