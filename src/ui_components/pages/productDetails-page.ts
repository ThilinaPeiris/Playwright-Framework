import { type Page, type Locator, expect } from "@playwright/test";
import { Constants } from "../../utils/app-constants";

export class ProductDetailsPage {
  private readonly productNameText: Locator;
  private readonly addToCartButton: Locator;

  constructor(public readonly page: Page) {
    this.productNameText = this.page.locator("css=h2.name");
    this.addToCartButton = this.page.getByRole("link", {
      name: "Add to cart",
    });
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async clickaddToCartButton() {
    await this.addToCartButton.click();
  }

  async isTheCorrectProductDisplayed(productName: string) {
    await expect(this.productNameText).toHaveText(productName);
  }

  async isVisible() {
    await expect(this.addToCartButton).toBeVisible();
    console.log("Product Details Page is loaded.");
  }
}
