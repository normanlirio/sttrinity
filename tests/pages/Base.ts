import { Page } from "@playwright/test";
import { Utilities } from "./Utilities";

export class Base {

    private readonly utilities: Utilities;
    protected readonly page: Page;

    constructor(page: Page) {
        this.utilities = new Utilities(page);
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }
    
    async clickCartIcon() {
        await this.utilities.clickCartIcon();
    }

    async clickBurgerMenuButton() {
        await this.utilities.clickBurgerMenuButton();
    }

    async getCartBadgeText() {
        await this.utilities.getCartBadgeText();
    }

    async clickLogoutButton() {
        await this.utilities.clickLogoutButton();
    }
}