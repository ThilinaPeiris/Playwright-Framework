import { test, expect } from "../fixtures/custom-fixtures";
import { Constants } from "../utils/app-constants";
import { Utilities } from "../utils/utilities";

test("Verify removing an item from Shopping Cart and purchase", async ({
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
  await cartPage.clickDeleteProductButton();
  await page.waitForLoadState("load");
  await cartPage.clickPlaceOrderButton();
  await page.waitForLoadState("load");
  await orderModal.fillTheOrdersFormAsAStandardUser(
    "Bhagy",
    "Sri Lanka",
    "Kandy",
    "123-123-1234-12334",
    "July",
    "2025"
  );

  // Intercept the /deletecart API call and its response ---
  // We'll use Promise.all to await both the button click and the request/response.
  // This ensures that the interceptor is ready *before* the action that triggers the request.
  const [interceptedRequest, interceptedResponse] = await Promise.all([
    page.waitForRequest(
      (request) =>
        request.url().includes("deletecart") && request.method() === "POST"
    ),
    page.waitForResponse(
      (response) =>
        response.url().includes("deletecart") &&
        response.request().method() === "POST"
    ),
    // --- Step 5: Click the 'Purchase' button in the order modal dialog ---
    // This action is now part of the Promise.all to ensure timing.
    orderModal.clickPurchaseButton(), // Adjust locator if needed
  ]);

  //await orderModal.clickPurchaseButton();

  // Assertions ---
  expect(interceptedRequest.method()).toBe("POST");
  expect(interceptedRequest.url()).toContain("deletecart");

  console.log("Intercepted Request URL:", interceptedRequest.url());
  console.log("Intercepted Request Method:", interceptedRequest.method());

  // Get the request payload (postData)
  const requestPayload = interceptedRequest.postData();
  console.log("Request Payload:", requestPayload);

  // If the cookie is sent as part of the JSON payload, parse and check it
  if (requestPayload) {
    try {
      const parsedPayload = JSON.parse(requestPayload);
      // Example: If the cookie value is expected in a field like 'cookieValue'
      expect(parsedPayload).toHaveProperty("cookie");
      expect(parsedPayload.cookie).toBe(name);
    } catch (e) {
      console.error("Could not parse request payload as JSON:", e);
    }
  } else {
    console.log("No request payload found.");
  }

  // Expect a successful response (e.g., 200 OK)
  expect(interceptedResponse?.status()).toBe(200);

  await orderModal.isOrderConfirmed();
  await orderModal.clickConfirmationOk();
  await expect(page).toHaveURL(Constants.BASEURL, { timeout: 10000 });
});
