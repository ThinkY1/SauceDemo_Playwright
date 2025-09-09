
import { expect, Locator, Page } from "@playwright/test";
import { ACTION_TIMEOUT } from "../utils/timeout-constant";
import { toastMessage } from "../testData/toastMessage";

export default class CheckoutInformationPage{
    readonly page: Page; 
    
    
    constructor(page: Page) {
        this.page = page;
    }  

    get inputFirstName(): Locator{
        return this.page.locator("//input[@data-test='firstName']");
    }

    get inputLastName(): Locator{
        return this.page.locator("//input[@data-test='lastName']");
    }

    get inputPostalCode(): Locator{
        return this.page.locator("//input[@data-test='postalCode']");
    }

    get btnContinue(): Locator{
        return this.page.locator("//input[@type='submit']");
    }

    get firstNameErrorMessage(): Locator{
        return this.page.locator("//h3[@data-test='error']");       
    }


    //#region Methods
    //Methods

    async fillFirstName(firstName: string){
        await expect.soft(this.inputFirstName).toBeEnabled({timeout: ACTION_TIMEOUT});
        await this.inputFirstName.fill(firstName);
    }

    async fillLastName(lastName: string){
        await expect.soft(this.inputLastName).toBeEnabled({timeout: ACTION_TIMEOUT});
        await this.inputLastName.fill(lastName);
    }

    async fillPostalCode(postalCode: string){
        await expect.soft(this.inputPostalCode).toBeEnabled({timeout: ACTION_TIMEOUT});
        await this.inputPostalCode.fill(postalCode);
    }       

    async clickBtnContinue(){
        await expect.soft(this.btnContinue).toBeVisible({timeout: ACTION_TIMEOUT});
        await this.btnContinue.click();
    }

    async verifyFirstNameErrorMessage(){
        await expect.soft(this.firstNameErrorMessage).toBeVisible({timeout: ACTION_TIMEOUT});
        const actualText = await this.firstNameErrorMessage.textContent();  
        if (actualText !== null) {
            await expect.soft(this.firstNameErrorMessage).toContainText(toastMessage.firstNameError);
        }

}

   //#endregion
}