import { Page, expect } from "@playwright/test";
import { test } from "../fixture/testFixture/fixture";
import { COMPLETE_MESSAGE_HEADER, COMPLETE_MESSAGE_TEXT, CUSTOMER, INVENTORY_ITEMS, PAYMENT_INFO, SHIPPING_INFO } from "../fixture/testdata";
import { removeDollarSign } from "../utils/helpers";
import { logger } from "../utils/logger";
import { log } from "node:console";
import { InventoryItem } from "../fixture/types";


test.describe("Visual Test", () => {

    test("Verify Add to cart button colo", async ({ pm }) => {
        const backpack = INVENTORY_ITEMS.find(item => item.itemName === "Sauce Labs Backpack") as InventoryItem;
        const workflow = pm.inventory;

        const addToCartButton = await workflow.getSpecificAddRemoveButton(backpack.itemName)
        const isEnabled = addToCartButton.isEnabled();
        const isVisible = addToCartButton.isVisible();

        expect(isVisible).toBeTruthy();
        expect(isEnabled).toBeTruthy();

        await pm.inventory.addSingleItem(backpack.itemName);

        const removeToCartButton = await workflow.getSpecificAddRemoveButton(backpack.itemName, false)
        await expect(removeToCartButton).toBeVisible();
        await expect(removeToCartButton).toHaveCSS('color', 'rgb(226, 35, 26)');
    });
});