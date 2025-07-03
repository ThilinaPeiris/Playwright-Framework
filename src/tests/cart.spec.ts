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
}) => {
  //await homePage.goto(Constants.BASEURL);
  //await headerSection.clicksignUpLink();
  //await signUpModal.sinUpAs_A_StandardUser("bhagy91-1", "@blaze-1234-1");
  await headerSection.clicklogInLink();
  await loginModal.loginAs_A_StandardUser("bhagy91-1", "@blaze-1234-1");
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

  // Add Sony vaio i5
  const sonyVaioI5LaptopLocator = await homePage.getProductLocatorByName(
    "Sony vaio i5"
  );
  await expect(sonyVaioI5LaptopLocator).toBeVisible();
  console.log('Found "Sony vaio i5" product.');
  await sonyVaioI5LaptopLocator.click();
  await productDetailsPage.isVisible();
  await productDetailsPage.isTheCorrectProductDisplayed("Sony vaio i5");
  await productDetailsPage.clickaddToCartButton();

  // Navigate back to home and then laptops category to add another product
  await headerSection.clickhomePageLink();
  await homePage.clickLaptopsCategory();

  // Add Sony vaio i5
  const sonyVaioI7LaptopLocator = await homePage.getProductLocatorByName(
    "Sony vaio i7"
  );
  await expect(sonyVaioI7LaptopLocator).toBeVisible();
  console.log('Found "Sony vaio i7" product.');
  await sonyVaioI7LaptopLocator.click();
  await productDetailsPage.isVisible();
  await productDetailsPage.isTheCorrectProductDisplayed("Sony vaio i7");
  await productDetailsPage.clickaddToCartButton();
});
