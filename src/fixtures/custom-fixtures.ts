import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { InventoryPage } from "../pages/inventory-page";
import { Constants } from "../utils/app-constants";

// Declare the types of your fixtures.
type PomFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  forEachTest: void;
};

// Extend base test by providing "LoginPage" and "InventoryPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<PomFixtures, { forEachWorker: void }>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPageObj = new LoginPage(page);

    // Use the fixture value in the test.
    await use(loginPageObj);

    // Clean up the fixture.
  },

  inventoryPage: async ({ page }, use) => {
    // Set up the fixture.

    // Use the fixture value in the test.
    await use(new InventoryPage(page));

    // Clean up the fixture.
  },
  forEachTest: [
    async ({ page }, use) => {
      // This code runs before every test.
      await page.goto(Constants.BASEURL);

      await use();

      // This code runs after every test.
      console.log("Last URL:", page.url());
    },
    { auto: true },
  ], // automatically starts for every test.

  forEachWorker: [
    async ({}, use) => {
      // This code runs before all the tests in the worker process.
      console.log(`Starting test worker ${test.info().workerIndex}`);

      await use();

      // This code runs after all the tests in the worker process.
      console.log(`Stopping test worker`);
    },
    { scope: "worker", auto: true },
  ], // automatically starts for every worker.
});

export { expect } from "@playwright/test";
