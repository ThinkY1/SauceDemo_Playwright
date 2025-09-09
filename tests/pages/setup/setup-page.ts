import { Page } from "@playwright/test";
import { browser } from "./global-setup";
import LoginPage from "../login-page";  
import ProductsPage from "../products-page";
import { setPage } from "../../utils/page-utils";


let page: Page;

export const setUpPage = async () => {
    if(!browser){
        throw new Error("Browser is not initialized."); 
    }

    if(!page){
        page = await browser.newPage();
    }

    page.context().on('page', async(newPage: Page) => {
        await newPage.waitForLoadState();
        setPage(newPage);
        console.log('page launched');
        });
    return page;
}
export {page, LoginPage, ProductsPage};
