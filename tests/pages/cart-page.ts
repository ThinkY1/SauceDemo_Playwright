import { expect, Locator, Page } from "@playwright/test";
import { ACTION_TIMEOUT } from "../utils/timeout-constant";

export default class CartPage{
    readonly page: Page; 
    
    
    constructor(page: Page) {
        this.page = page;
    }  

    
    get cartquantity():Locator{
        return this.page.locator("//div[@class='cart_quantity']");
    }

     get btnCart(): Locator{
        return this.page.locator("//a[@class[contains(.,'shopping_cart')]]");
    }

     getCartItemName(itemName: string): Locator{
        return this.page.locator(`//div[@class[contains(.,'inventory_item_name')] and contains(.,'${itemName}')]`);
    } 

    get btnCheckout(): Locator{
        return this.page.locator("//*[@class[contains(.,'btn_action')]]");
    }

    async expectItemIsDiplayedInCart(itemName: string){
       await expect.soft(this.getCartItemName(itemName)).toBeVisible();   
    }

    async clickBtnCheckout(){
        await expect.soft(this.btnCheckout).toBeVisible();
        await this.btnCheckout.click();
    }

    async clickBtnCart(){
        await expect.soft(this.btnCart).toBeVisible({timeout: ACTION_TIMEOUT});
        await this.btnCart.click();
    }
}
