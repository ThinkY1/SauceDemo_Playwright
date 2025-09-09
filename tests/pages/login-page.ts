import { Page, Locator, expect } from '@playwright/test';
import { ACTION_TIMEOUT } from '../utils/timeout-constant';

export default class LoginPage{
    goto() {
        throw new Error("Method not implemented.");
    }
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }   

    //Locators
    get inputUsername(): Locator{
        return this.page.locator("//input[@placeholder='Username']");
    }

    get inputPassword(): Locator{
        return this.page.locator("//input[@placeholder='Password']");
    }
    
    get btnLogin(): Locator{        
        return this.page.locator("//input[@id='login-button']");
    }


    //Methods
    async navigateToLoginPage(){
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded',{timeout: ACTION_TIMEOUT});

    }

    async login(username: string, password: string){
        await this.inputUsername.fill(username);
        await this.inputPassword.fill(password);
        await expect.soft(this.inputPassword).toHaveValue(password);
        await this.btnLogin.click();
    }
}
