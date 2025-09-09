import { expect } from "@playwright/test";
import LoginPage from "../pages/login-page";
import { validUser } from "../testData/users";



async function loginAs({ loginPage }: { loginPage: LoginPage }) {
await loginPage.goto();
await expect.soft(loginPage.inputUsername).toBeVisible();
await loginPage.login(validUser.username, validUser.password);
}