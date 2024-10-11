import { test, expect } from "../fixtures/custom-fixtures";
import { LoginPage } from "../pages/login-page";
import { Constants } from "../utils/app-constants";

test("Verify valid login as a Standard User", async ({ page, loginPage }) => {
  await loginPage.loginAs_A_StandardUser(
    Constants.STANDARD_USER_NAME,
    Constants.STANDARD_USER_PASSWORD
  );
  await expect(page.locator(".app_logo")).toHaveText("Swag Labs");
});

test("Verify adding an item to Shopping Cart", async ({
  page,
  loginPage,
  inventoryPage,
}) => {
  await loginPage.goto(Constants.BASEURL);
  await loginPage.loginAs_A_StandardUser(
    Constants.STANDARD_USER_NAME,
    Constants.STANDARD_USER_PASSWORD
  );
  await expect(page.locator(".app_logo")).toHaveText("Swag Labs");
  await inventoryPage.testItems();
});
