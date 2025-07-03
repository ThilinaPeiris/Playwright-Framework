import { test, expect } from "../fixtures/custom-fixtures";
import { Constants } from "../utils/app-constants";

// test("Verify valid login as a Standard User", async ({ page, loginPage }) => {
//   await loginPage.loginAs_A_StandardUser(
//     Constants.STANDARD_USER_NAME,
//     Constants.STANDARD_USER_PASSWORD
//   );
//   await expect(page.locator(".app_logo")).toHaveText("Swag Labs");
// });

test("Verify adding an item to Shopping Cart", async ({
  page,
  homePage,
  signUpModal,
  loginModal,
  productDetailsPage,
  headerSection,
  cartPage,
  orderModal,
}) => {
  await homePage.goto(Constants.BASEURL);
  await headerSection.clickSignUpLink();
  await signUpModal.signUpAs_A_StandardUser("bhagy91-2", "@blaze-1234-2");
  await headerSection.clickLogInLink();
  await loginModal.loginAs_A_StandardUser("bhagy91-2", "@blaze-1234-2");
  await homePage.clickLaptopsCategory();
  await homePage.waitUntilProductsVisible();
  const productTitles = await homePage.getProductTitles();
  const sonyLaptopsFound = productTitles.some((title) =>
    title.includes("Sony")
  );

  expect(sonyLaptopsFound).toBeTruthy();
  console.log(
    "Validated that Sony laptops are displayed in the search results."
  );

  const sonyVaioI5LaptopLocator = await homePage.getProductLocatorByName(
    "Sony vaio i5"
  );
  await expect(sonyVaioI5LaptopLocator).toBeVisible();
  console.log('Found "Sony vaio i5" product.');
  await sonyVaioI5LaptopLocator.click();
  await productDetailsPage.isVisible();
  await productDetailsPage.isTheCorrectProductDisplayed("Sony vaio i5");
  await productDetailsPage.clickaddToCartButton();

  await headerSection.isVisible();
  await headerSection.clickHomePageLink();
  await homePage.clickLaptopsCategory();

  const sonyVaioI7LaptopLocator = await homePage.getProductLocatorByName(
    "Sony vaio i7"
  );
  await expect(sonyVaioI7LaptopLocator).toBeVisible();
  console.log('Found "Sony vaio i7" product.');
  await sonyVaioI7LaptopLocator.click();
  await productDetailsPage.isVisible();
  await productDetailsPage.isTheCorrectProductDisplayed("Sony vaio i7");
  await productDetailsPage.clickaddToCartButton();

  await headerSection.isVisible();
  await headerSection.clickCartLink();
  await cartPage.isVisible();
  await cartPage.clickDeleteProductButton();
  await cartPage.isVisible();

  await orderModal.clickPurchaseButton();
  await orderModal.isOrderConfirmed();
  await orderModal.clickConfirmationOk();

  await expect(page).toHaveURL(Constants.BASEURL);
  console.log("Successfully placed the order and returned to home page.");
});
