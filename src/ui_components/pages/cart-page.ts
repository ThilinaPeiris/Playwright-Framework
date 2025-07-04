import { type Page, type Locator, expect } from "@playwright/test";
import { Constants } from "../../utils/app-constants";

export class CartPage {
  private readonly placeOrderButton: Locator;
  private readonly deleteProductButton: Locator;

  constructor(public readonly page: Page) {
    this.placeOrderButton = this.page.getByRole("button", {
      name: "Place Order",
    });
    this.deleteProductButton = this.page
      .locator("tr")
      .filter({ hasText: "Sony vaio i5" })
      .getByRole("link", { name: "delete" })
      .first();
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async clickPlaceOrderButton() {
    await this.placeOrderButton.waitFor({ state: "visible" });
    await this.placeOrderButton.click();
  }

  async clickDeleteProductButton() {
    await this.deleteProductButton.waitFor({ state: "visible" });
    await this.deleteProductButton.click();
  }
}
