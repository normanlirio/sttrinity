import { Page } from "@playwright/test";
import { Base } from "./Base";
import { CustomerDetails } from "../fixture/types";
import { logger } from "../utils/logger";

export class Checkout extends Base {

    private static readonly SELECTORS = {
        firstName: '[data-test="firstName"]',
        lastName: '[data-test="lastName"]',
        postalCode: '[data-test="postalCode"]',
        continueButton: '[data-test="continue"]',
        title: '[data-test="title"]',
    } as const;

    constructor(page: Page) {
        super(page);
    }

    get firstName() {
        return this.page.locator(Checkout.SELECTORS.firstName);
    }

    get lastName() {
        return this.page.locator(Checkout.SELECTORS.lastName);
    }

    get postalCode() {
        return this.page.locator(Checkout.SELECTORS.postalCode);
    }

    get continueButton() {
        return this.page.locator(Checkout.SELECTORS.continueButton);
    }

    get title() {
        return this.page.locator(Checkout.SELECTORS.title);
    }

    async fillCheckoutInformation(customerDetails: CustomerDetails) {
        logger.info(`Filling checkout information for ${customerDetails.firstName} ${customerDetails.lastName}`);
        await this.firstName.fill(customerDetails.firstName);
        await this.lastName.fill(customerDetails.lastName);
        await this.postalCode.fill(customerDetails.zip);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }
}
