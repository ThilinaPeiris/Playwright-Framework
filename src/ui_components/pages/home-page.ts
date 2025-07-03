import { type Page, type Locator, expect } from "@playwright/test";
import { Constants } from "../../utils/app-constants";

export class HomePage {
  readonly welcomeUserText: Locator;
  readonly laptopsCategoryLink: Locator;
  readonly productTitles: Locator;

  constructor(public readonly page: Page) {
    this.laptopsCategoryLink = this.page.getByRole("button", {
      name: "Laptops",
    });
    this.welcomeUserText = page.locator("#nameofuser");
    this.laptopsCategoryLink = page.locator("text=Laptops");
    this.productTitles = page.locator(".card-title");
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async clickLaptopsCategory() {
    await this.laptopsCategoryLink.click();
    console.log('Clicked "Laptops" category.');
    await this.page.waitForSelector(".card-title", { state: "visible" }); // Wait for products to load
  }

  async getProductTitles(): Promise<string[]> {
    return await this.productTitles.allTextContents();
  }

  async getProductLocatorByName(productName: string): Promise<Locator> {
    return this.page.locator(`.card-title:has-text("${productName}")`);
  }

  async waitUntilProductsVisible() {
    await expect(
      this.page.locator(".card-title").last(),
      "Wait for products to load"
    ).toBeVisible();
  }
}
