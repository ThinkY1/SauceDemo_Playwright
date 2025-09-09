import { Page, Locator, expect } from '@playwright/test';
import { ACTION_TIMEOUT } from '../utils/timeout-constant';

export default class ProductsPage{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }   


    //Locators

    get productsTitle(): Locator{
        return this.page.locator("//*[text()='Products']");
    }

    getItemNameInProductsList(itemName: string): Locator{
        return this.page.locator(`//div[@class[contains(.,'inventory_item_name')] and contains(.,'${itemName}')]`);
    }

    get btnAddToCart(): Locator{
        return this.page.locator("//button[contains(@id,'add-to-cart')]");
    }

    get btnBackToProducts(): Locator{
        return this.page.locator("//button[contains(.,'Back')]");
    }

   

    get btnOpenMenu(): Locator{     
        return this.page.locator("//button[text()='Open Menu']");
    }

    get btnRemoveFromCart(): Locator{
        return this.page.locator("//button[contains(.,'Remove')]");
    }

    get btnLogout(): Locator{
        return this.page.locator("//a[@id='logout_sidebar_link']");
    }

    get cartquantity():Locator{
        return this.page.locator("//div[@class='cart_quantity']");
    }

    get cartbadgeCount(): Locator{
        return this.page.locator("//span[@class[contains(.,'shopping_cart_badge')]]");
    }


    //Methods

    async verifyProductsPageTitle(){
        await expect.soft(this.productsTitle).toBeVisible();
    }

    async clickBtnAddToCart(){
        await expect.soft(this.btnAddToCart).toBeVisible({timeout: ACTION_TIMEOUT});
        await this.btnAddToCart.click();
    }

    async verifyBtnBackToProductsIsVisible(){
        await expect.soft(this.btnBackToProducts).toBeVisible({timeout: ACTION_TIMEOUT});
    }

    async clickBtnOpenMenu(){
        await expect.soft(this.btnOpenMenu).toBeVisible({timeout: ACTION_TIMEOUT});
        await this.btnOpenMenu.click();
    }

    async clickLogoutBtn(){
        await this.clickBtnOpenMenu();
        await expect.soft(this.btnLogout).toBeVisible({timeout: ACTION_TIMEOUT});
        await this.btnLogout.click();
    }

    async verifyBtnRemoveFromCartIsVisible(){
        await expect.soft(this.btnRemoveFromCart).toBeVisible({timeout: ACTION_TIMEOUT});
    }

    async addItemToCartByName(itemName: string){
        await expect.soft(this.getItemNameInProductsList(itemName)).toBeVisible({timeout: ACTION_TIMEOUT});
        await this.getItemNameInProductsList(itemName).click();
        await this.verifyBtnBackToProductsIsVisible();
        await this.clickBtnAddToCart();
        await this.verifyBtnRemoveFromCartIsVisible();
    }

     async expectItemIsListed(itemName: string){
        await expect.soft(this.getItemNameInProductsList(itemName)).toBeVisible({timeout: ACTION_TIMEOUT});
    } 

    async expectCartBadgeCount(count: string){
        await expect.soft(this.cartbadgeCount).toHaveText(count);
    }

}


//div[@class[contains(.,'inventory_item_name')]]