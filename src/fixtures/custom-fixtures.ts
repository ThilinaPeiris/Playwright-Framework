import { test as base } from "@playwright/test";
import { HomePage } from "../ui_components/pages/home-page";
import { ProductDetailsPage } from "../ui_components/pages/productDetails-page";
import { CartPage } from "../ui_components/pages/cart-page";
import { SignUpModal } from "../ui_components/modal-dialogs/signUp-modal";
import { LoginModal } from "../ui_components/modal-dialogs/login-modal";
import { OrderModal } from "../ui_components/modal-dialogs/order-modal";
import { HeaderSection } from "../ui_components/sections/header-section";
import { Constants } from "../utils/app-constants";

// Declare the types of your fixtures.
type PomFixtures = {
  homePage: HomePage;
  signUpModal: SignUpModal;
  loginModal: LoginModal;
  productDetailsPage: ProductDetailsPage;
  headerSection: HeaderSection;
  cartPage: CartPage;
  orderModal: OrderModal;
  forEachTest: void;
};

// Extend base test by providing "LoginPage" and "InventoryPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<PomFixtures, { forEachWorker: void }>({
  homePage: async ({ page }, use) => {
    const homePageObj = new HomePage(page);
    await use(homePageObj);
  },

  signUpModal: async ({ page }, use) => {
    const signUpPageObj = new SignUpModal(page);
    await use(signUpPageObj);
  },

  orderModal: async ({ page }, use) => {
    const orderModalPageObj = new OrderModal(page);
    await use(orderModalPageObj);
  },

  cartPage: async ({ page }, use) => {
    const cartPageObj = new CartPage(page);
    await use(cartPageObj);
  },

  loginModal: async ({ page }, use) => {
    const loginPageObj = new LoginModal(page);
    await use(loginPageObj);
  },

  productDetailsPage: async ({ page }, use) => {
    const productDetailsObj = new ProductDetailsPage(page);
    await use(productDetailsObj);
  },

  headerSection: async ({ page }, use) => {
    const headerSectionObj = new HeaderSection(page);
    await use(headerSectionObj);
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
