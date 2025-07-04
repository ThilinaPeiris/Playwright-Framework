import { test, expect } from "../fixtures/custom-fixtures";
import { Constants } from "../utils/app-constants";
import { Utilities } from "../utils/utilities";

//execute the test case with the help of saved state..
test("Verify adding an item to Shopping Cart", async ({
  homePage,
  productDetailsPage,
}) => {
  console.log(
    "Navigating to index page with pre-loaded state for THIS test..."
  );

  await homePage.waitUntilProductsVisible();
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
});
