import { Page } from "@playwright/test";
import { Base } from "./Base";
import { logger } from "../utils/logger";
import { InventoryItem } from "../fixture/types";

export class Inventory extends Base {

    static readonly SELECTORS = {
        inventoryContainer: '[data-test="inventory-list"]',
        inventoryItem: '[data-test="inventory-item"]',
        inventoryItemName: '.inventory_item_name',
        inventoryItemDesc: '[data-test="inventory-item-description"]',
        inventoryItemPrice: '[data-test="inventory-item-price"]',
        inventoryItemImg: '.inventory_item_img',
        addToCartButton: '[data-test^="add-to-cart-"]',
        removeButton: '[data-test^="remove-"]',
        cartIcon: 'a[data-test="shopping-cart-link"]',
    } as const;

    constructor(page: Page) {
        super(page);
    }

    get inventoryContainer() {
        return this.page.locator(Inventory.SELECTORS.inventoryContainer);
    }

    get inventoryItem() {
        return this.page.locator(Inventory.SELECTORS.inventoryItem);
    }

    get inventoryItemName() {
        return this.page.locator(Inventory.SELECTORS.inventoryItemName);
    }

    get inventoryItemDesc() {
        return this.page.locator(Inventory.SELECTORS.inventoryItemDesc);
    }

    get inventoryItemPrice() {
        return this.page.locator(Inventory.SELECTORS.inventoryItemPrice);
    }

    get inventoryItemImg() {
        return this.page.locator(Inventory.SELECTORS.inventoryItemImg);
    }

    get addToCartButton() {
        return this.page.locator(Inventory.SELECTORS.addToCartButton);
    }

    get removeButton() {
        return this.page.locator(Inventory.SELECTORS.removeButton);
    }

    get cartIcon() {
        return this.page.locator(Inventory.SELECTORS.cartIcon);
    }


    async addItemToCartByName(items: InventoryItem[]) {
        logger.info(`Adding items to cart: ${items.map(item => item.itemName).join(", ")}`);
        for (const { itemName, itemPrice } of items) {
            await this.page.locator(Inventory.SELECTORS.inventoryItem)
                .filter({ hasText: itemName })
                .locator(Inventory.SELECTORS.addToCartButton)
                .click();
        }
    }
}
