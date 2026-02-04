import { Page, expect } from "@playwright/test";
import { test } from "../fixture/testFixture/fixture";
import { COMPLETE_MESSAGE_HEADER, COMPLETE_MESSAGE_TEXT, CUSTOMER, INVENTORY_ITEMS, PAYMENT_INFO, SHIPPING_INFO } from "../fixture/testdata";
import { removeDollarSign } from "../utils/helpers";
import { logger } from "../utils/logger";
import { log } from "node:console";
import { InventoryItem } from "../fixture/types";


test.describe("Visual Test", () => {

    test("Visual Checkpoint - Inventory Page", async ({ pm }) => {
        
    });
});