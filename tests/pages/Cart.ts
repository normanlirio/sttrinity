import { Page } from "@playwright/test";
import { Base } from "./Base";


export class Cart extends Base {

    static readonly SELECTORS = {
        inventoryItem: '[data-test="inventory-item"]',
        checkoutButton: '[data-test="checkout"]',
        continueShoppingButton: '[data-test="continue-shopping"]',
        title: '[data-test="title"]',
    } as const;

    constructor(page: Page) {
        super(page);
    }

    get inventoryItem() {
        return this.page.locator(Cart.SELECTORS.inventoryItem);
    }

    get checkoutButton() {
        return this.page.locator(Cart.SELECTORS.checkoutButton);
    }

    get continueShoppingButton() {
        return this.page.locator(Cart.SELECTORS.continueShoppingButton);
    }

    get title() {
        return this.page.locator(Cart.SELECTORS.title);
    }

    async getAllCartItems() {
        return await  this.page.locator(Cart.SELECTORS.inventoryItem).all();
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
}
