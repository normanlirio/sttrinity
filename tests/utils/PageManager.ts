import { Page } from '@playwright/test';

import { Utilities } from '../pages/Utilities';
import { Inventory } from '../pages/Inventory';
import { Cart } from '../pages/Cart';
import { Checkout } from '../pages/Checkout';
import { Overview } from '../pages/Overview';
import { Complete } from '../pages/Complete';


/**
 * Centralized PageManager to manage all page objects
 * Provides lazy initialization and consistent access to page objects
 */
class PageManager {
 
    private _inventory?: Inventory;
    private _cart?: Cart;
    private _checkout?: Checkout;
    private _overview?: Overview;
    private _complete?: Complete
    private _utilities?: Utilities;

    constructor(private page: Page) {}

    get inventory(): Inventory {
        if (!this._inventory) {
            this._inventory = new Inventory(this.page);
        }
        return this._inventory;
    }

    get cart(): Cart {
        if (!this._cart) {
            this._cart = new Cart(this.page);
        }
        return this._cart;
    }

    get checkout(): Checkout {
        if (!this._checkout) {
            this._checkout = new Checkout(this.page);
        }
        return this._checkout;
    }

    get overview(): Overview {
        if (!this._overview) {
            this._overview = new Overview(this.page);
        }
        return this._overview;
    }

    get utilities(): Utilities {
        if (!this._utilities) {
            this._utilities = new Utilities(this.page);
        }
        return this._utilities;
    }

    get complete(): Complete {
        if (!this._complete) {
            this._complete = new Complete(this.page);
        }
        return this._complete;
    }

    getPage(): Page {
        return this.page;
    }
}

export default PageManager;