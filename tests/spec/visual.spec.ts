import { expect } from "@playwright/test";
import { test } from "../fixture/testFixture/fixture";
import { INVENTORY_ITEMS } from "../fixture/testdata";
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