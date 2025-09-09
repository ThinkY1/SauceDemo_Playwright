import {test, expect, Browser, Page, chromium} from '@playwright/test';
import LoginPage from '../pages/login-page';
import ProductsPage from '../pages/products-page';
import CartPage from '../pages/cart-page';
import { invalidLogins, validUser } from '../testData/users';
import { products } from '../testData/products'; 
import { setUpBrowser } from '../pages/setup/global-setup';
import { tearDownBrowser, tearDownPage } from '../pages/setup/teardown';
import { page, setUpPage } from '../pages/setup/setup-page';
import CheckoutInformationPage from '../pages/checkout-Your-Information-page';
import CheckoutOverviewPage from '../pages/checkout-overview-page';
import { ACTION_TIMEOUT } from '../utils/timeout-constant';
import { toastMessage } from '../testData/toastMessage';


let loginPage: LoginPage;
let productsPage: ProductsPage;
let cartPage: CartPage; 
let checkoutInfo: CheckoutInformationPage;
let checkoutOverview: CheckoutOverviewPage;
let invaliduserflag= false;

test.beforeAll(async()=>{
    await setUpBrowser();
});

test.afterEach(async()=>{
    productsPage = new ProductsPage(page);
   
    if(invaliduserflag){
        await tearDownPage();
    }
    else{
        try{
            await productsPage.clickLogoutBtn();
    }
    catch(error){
        console.error("Error during logout:", error);
    }
       await tearDownPage();
    }
    
});

test.afterAll(async()=>{     
    await tearDownBrowser();
   });

test.beforeEach(async()=>{
    await setUpPage();
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page); 


    await loginPage.navigateToLoginPage();
    
});


test('verify invalid login for locked out user', async() => {
    invaliduserflag = true;
    await loginPage.login(invalidLogins[2].username, invalidLogins[2].password);
    await expect.soft(invalidLogins[2].message).toContain(toastMessage.lockedoutuser);
});



test('Verify checkout when checkout information is not entered', async() => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutInfo = new CheckoutInformationPage(page);   
    checkoutOverview = new CheckoutOverviewPage(page);
    invaliduserflag = false;
    await loginPage.login(validUser.username, validUser.password);  
    await expect.soft(page).toHaveURL('/inventory.html');
    await productsPage.verifyProductsPageTitle();
    await productsPage.addItemToCartByName(products.backpack);
    await productsPage.verifyBtnRemoveFromCartIsVisible();
    await cartPage.clickBtnCart();
    await cartPage.expectItemIsDiplayedInCart(products.backpack);
    await cartPage.clickBtnCheckout();  
    await checkoutInfo.fillFirstName('');
    await checkoutInfo.clickBtnContinue();
    await page.waitForLoadState('domcontentloaded',{timeout: ACTION_TIMEOUT});
    await checkoutInfo.verifyFirstNameErrorMessage();
});