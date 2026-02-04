import { Page } from "@playwright/test";
import { Base } from "./Base";
import { removeDollarSign } from "../utils/helpers";
import { InventoryItem } from "../fixture/types";
import { logger } from "../utils/logger";


export class Overview extends Base {

    static readonly SELECTORS = {
        inventoryItem: '[data-test="inventory-item"]',
        finishButton: '[data-test="finish"]',
        inventoryItemName: '[data-test="inventory-item-name"]',
        inventoryItemPrice: '[data-test="inventory-item-price"]',
        checkoutSuccessMessage: 'h2[data-test="complete-header"]',
        backHomeButton: '[data-test="back-to-products"]',
        totalAmount: '[data-test="total-label"]',
        title: '[data-test="title"]',
        subTotal: '[data-test="subtotal-label"]',
        tax: '[data-test="tax-label"]',
        paymentInfo: '[data-test="payment-info-value"]',
        shippingInfo: '[data-test="shipping-info-value"]'
    } as const;

    constructor(page: Page) {
        super(page);
    }

    get inventoryItem() {
        return this.page.locator(Overview.SELECTORS.inventoryItem);
    }

    get finishButton() {
        return this.page.locator(Overview.SELECTORS.finishButton);
    }

    get checkoutSuccessMessage() {
        return this.page.locator(Overview.SELECTORS.checkoutSuccessMessage);
    }

    get backHomeButton() {
        return this.page.locator(Overview.SELECTORS.backHomeButton);
    }

    get totalAmount() {
        return this.page.locator(Overview.SELECTORS.totalAmount);
    }

    get title() {
        return this.page.locator(Overview.SELECTORS.title);
    }

    get inventoryItemPrice() {
        return this.page.locator(Overview.SELECTORS.inventoryItemPrice);
    }

    get inventoryItemName() {
        return this.page.locator(Overview.SELECTORS.inventoryItemName);
    }

    get subTotal() {
        return this.page.locator(Overview.SELECTORS.subTotal);
    }

    get tax() {
        return this.page.locator(Overview.SELECTORS.tax);
    }

    get paymentInfo() {
        return this.page.locator(Overview.SELECTORS.paymentInfo);
    }

    get shippingInfo() {
        return this.page.locator(Overview.SELECTORS.shippingInfo);
    }

    getTaxText() {
        return this.tax.textContent();
    }

    getSubTotalText() {
        return this.subTotal.textContent();
    }

    getTotalAmountText() {
        return this.totalAmount.textContent();
    }

    async getAllInventoryItemNames() {
        return await this.inventoryItemName.allTextContents();
    }

    async getAllInvetoryItemPrices() {
        return await this.inventoryItemPrice.allTextContents();
    }


    computeSubTotal(inventoryItems: number[]): string {
        const total = inventoryItems
            .reduce((sum, item) => sum + item, 0)
            .toFixed(2);
        return `$${total}`;
    }

    computeTax(subTotal: string, taxRate: number = 0.08): string {
        const tax = (parseFloat(removeDollarSign(subTotal)) * taxRate).toFixed(2);
        return `$${tax}`;
    }

    computeTotal(subTotal: string, tax: string): string {
        const total = parseFloat(removeDollarSign(subTotal)) 
            + parseFloat(removeDollarSign(tax));
        return `$${total.toFixed(2)}`;
    }

    async clickfinishCheckout() {
        logger.info("Clicking Finish Button on Overview Page");
        await this.finishButton.click();
    }
}
