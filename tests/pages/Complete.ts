
import { Page } from "@playwright/test";
import { Base } from "./Base";


export class Complete extends Base {

    static readonly SELECTORS = {
        completeLabel: '[data-test="complete-header"]',
        completeLabelSubtitle: '[data-test="complete-text"]',
        backHomeButton: 'button[data-test="back-to-products"]'
    } as const;

    constructor(page: Page) {
        super(page);
    }

    get completeLabel() {
        return this.page.locator(Complete.SELECTORS.completeLabel); 
    }
    
    get completeLabelSubtitle() {   
        return this.page.locator(Complete.SELECTORS.completeLabelSubtitle);
    }
    
    get backHomeButton() {
        return this.page.locator(Complete.SELECTORS.backHomeButton);
    }

    getCompleteLabelText() {
        return this.completeLabel.textContent();
    }

    getCompleteLabelSubtitleText() {
        return this.completeLabelSubtitle.textContent();
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }

  
}

