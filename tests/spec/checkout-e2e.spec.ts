import { Page, expect } from "@playwright/test";
import { test } from "../fixture/testFixture/fixture";
import { COMPLETE_MESSAGE_HEADER, COMPLETE_MESSAGE_TEXT, CUSTOMER, INVENTORY_ITEMS, PAYMENT_INFO, SHIPPING_INFO } from "../fixture/testdata";
import { removeDollarSign } from "../utils/helpers";
import { logger } from "../utils/logger";
import { log } from "node:console";
import { InventoryItem } from "../fixture/types";


test.describe("Checkout E2E Test Suite", () => {

    test("Complete Checkout Process", async ({ pm }) => {

        await test.step("Add items to cart and verify cart number badge", async () => {
            await pm.inventory.addItemToCartByName(INVENTORY_ITEMS);
            const cartBadgeText = await pm.utilities.getCartBadgeText();

            expect(cartBadgeText).toBe(INVENTORY_ITEMS.length.toString());
        });

        await test.step("Navigate to cart, verify items added in cart, and proceed to Your Information", async () => {
            await pm.inventory.clickCartIcon();

            await expect(pm.getPage()).toHaveURL(/.*cart.html/);

            const cartItems = await pm.cart.getAllCartItems();

            cartItems.forEach(async (item, index) => {
                await expect(item).toContainText(INVENTORY_ITEMS[index].itemName);
                await expect(item).toContainText(INVENTORY_ITEMS[index].itemPrice);
            });
            await pm.cart.checkoutButton.click();
        });

        await test.step("Fill in checkout information and continue to overview", async () => {
            await expect(pm.getPage()).toHaveURL(/.*checkout-step-one.html/);
            await pm.checkout.fillCheckoutInformation(CUSTOMER);
            await pm.checkout.clickContinueButton()
        });

        await test.step("Verify Payment Information, Shipping Information, and Price Total", async () => {
            const workflow = pm.overview;

            await expect(pm.getPage()).toHaveURL(/.*checkout-step-two.html/);

            await expect(workflow.paymentInfo).toHaveText(PAYMENT_INFO);

            await expect(workflow.shippingInfo).toHaveText(SHIPPING_INFO);

            const expectedSubTotal = workflow.computeSubTotal(
                INVENTORY_ITEMS.map(item => parseFloat(removeDollarSign(item.itemPrice)))
            );

            const actualPrices = await workflow.getAllInvetoryItemPrices();

            const actualSubTotal = workflow.computeSubTotal(
                actualPrices.map(price => parseFloat(removeDollarSign(price)))
            );

            logger.info(`Expected Total: ${expectedSubTotal}, Actual Total: ${actualSubTotal}`);

            expect(actualSubTotal).toBe(expectedSubTotal);

            await expect(workflow.subTotal).toHaveText(`Item total: ${expectedSubTotal}`);

            const computedTax = workflow.computeTax(expectedSubTotal);
          
            await expect(workflow.tax).toHaveText(`Tax: ${computedTax}`);

            await expect(workflow.totalAmount).toHaveText(
                `Total: ${workflow.computeTotal(expectedSubTotal, computedTax)}`
            );

            await workflow.clickfinishCheckout();
        });

        await test.step("Finish checkout and verify completion", async () => {
            await expect(pm.getPage()).toHaveURL(/.*checkout-complete.html/);
            logger.info(pm.complete.completeLabel.toString());
        
            await expect(pm.complete.completeLabel).toHaveText(COMPLETE_MESSAGE_HEADER);

            await expect(pm.complete.completeLabelSubtitle).toHaveText(
                COMPLETE_MESSAGE_TEXT
            );
            
            await pm.complete.clickBackHome();

            await expect(pm.inventory.inventoryContainer).toBeVisible();
        });
    });
});