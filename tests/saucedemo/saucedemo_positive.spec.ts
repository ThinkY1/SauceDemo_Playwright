
import {test, expect, Browser, Page, chromium} from '@playwright/test';
import LoginPage from '../pages/login-page';
import ProductsPage from '../pages/products-page';
import CartPage from '../pages/cart-page';
import { customers, validUser } from '../testData/users';
import { products } from '../testData/products'; 
import { setUpBrowser } from '../pages/setup/global-setup';
import { tearDownBrowser, tearDownPage } from '../pages/setup/teardown';
import { page, setUpPage } from '../pages/setup/setup-page';
import CheckoutInformationPage from '../pages/checkout-Your-Information-page';
import CheckoutOverviewPage from '../pages/checkout-overview-page';


let loginPage: LoginPage;
let productsPage: ProductsPage;
let cartPage: CartPage; 
let checkoutInfo: CheckoutInformationPage;
let checkoutOverview: CheckoutOverviewPage;

test.beforeAll(async()=>{
    await setUpBrowser();
});

test.afterEach(async()=>{
    productsPage = new ProductsPage(page);
    try{
        await productsPage.clickLogoutBtn();
    }
    catch(error){
        console.error("Error during logout:", error);
    }
    await tearDownPage();
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
    await loginPage.login(validUser.username, validUser.password);  
});


test('valid login directs to Products page', async() => {
    productsPage = new ProductsPage(page);
    await productsPage.verifyProductsPageTitle();
    for (const [productKey, productName] of Object.entries(products)){
        const item = productName as string;{
        await productsPage.expectItemIsListed(item);    
    }
  }
});

test('Add product to cart and verify item is displayed', async() => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await expect.soft(page).toHaveURL('/inventory.html');
    await productsPage.verifyProductsPageTitle();
    await productsPage.addItemToCartByName(products.backpack);
    await productsPage.verifyBtnRemoveFromCartIsVisible();
    await productsPage.expectCartBadgeCount('1');
    await cartPage.clickBtnCart();
    await cartPage.expectItemIsDiplayedInCart(products.backpack);
});

test('Verify successfull checkout', async() => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutInfo = new CheckoutInformationPage(page);   
    checkoutOverview = new CheckoutOverviewPage(page);

    await expect.soft(page).toHaveURL('/inventory.html');
    await productsPage.verifyProductsPageTitle();
    await productsPage.addItemToCartByName(products.backpack);
    await productsPage.verifyBtnRemoveFromCartIsVisible();
    await cartPage.clickBtnCart();
    await cartPage.expectItemIsDiplayedInCart(products.backpack);
    await cartPage.clickBtnCheckout();  
    await checkoutInfo.fillFirstName(customers[0].firstName);
    await checkoutInfo.fillLastName(customers[0].lastName);
    await checkoutInfo.fillPostalCode(customers[0].pincode);
    await checkoutInfo.clickBtnContinue();
    await checkoutOverview.clickBtnFinish();
    await checkoutOverview.verifyOrderConfirmationMessage();

});

