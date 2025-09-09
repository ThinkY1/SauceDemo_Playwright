import { Page } from "@playwright/test";

let page: Page;

export async function setPage(newPage: Page){
    page = newPage;
}