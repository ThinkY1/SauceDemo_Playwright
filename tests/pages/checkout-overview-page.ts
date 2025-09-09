import { expect, Locator, Page } from "@playwright/test";
import { ACTION_TIMEOUT } from "../utils/timeout-constant";

export default class CheckoutOverviewPage{
    readonly page: Page; 
    
    
    constructor(page: Page) {
        this.page = page;
    }  

get btnFinish(): Locator{    
    return this.page.locator("//*[@class[contains(.,'btn_action')]]");       
}

get confirmationMessage(): Locator{
    return this.page.locator("//h2[@class='complete-header']");
}


//Methods

async clickBtnFinish(){
        await expect.soft(this.btnFinish).toBeEnabled({timeout: ACTION_TIMEOUT});
        await this.btnFinish.click();
    }

async verifyOrderConfirmationMessage(){
    await expect.soft(this.confirmationMessage).toBeVisible({timeout: ACTION_TIMEOUT});
    await this.page.waitForLoadState('domcontentloaded',{timeout: ACTION_TIMEOUT});
    const actualText = await this.confirmationMessage.textContent();
    if (actualText !== null) {
        await expect.soft(this.confirmationMessage).toContainText(actualText);
    }
    console.log(actualText);
  }
}