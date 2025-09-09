import { Browser, chromium } from "@playwright/test";

let browser: Browser;

export const setUpBrowser = async () => {
    browser = await chromium.launch({ headless: false });
}

export {browser};