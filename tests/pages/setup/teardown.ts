import { Browser, Page } from "@playwright/test";


let page: Page |undefined;
let browser: Browser |undefined;

export const tearDownPage = async() => {
  if(page){
    await page.close();
  }

}

export const tearDownBrowser = async() => {
  if(browser){
    await browser.close();
  }
}    