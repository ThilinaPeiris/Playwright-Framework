import { Page, Locator } from "@playwright/test";
import { Constants } from "../utils/app-constants";

export class InventoryPage {
  private itemName: string = "Sauce Labs Backpack";
  private readonly inventoryItems: Locator;
  private readonly itemLocator: Locator;
  private readonly itemLink: Locator;
  private readonly itemPriceText: Locator;
  private readonly itemAddToCart: Locator;

  constructor(public readonly page: Page, item?: string) {
    if (item !== undefined) this.itemName = item;
    this.inventoryItems = this.page.locator(".inventory_item");
    this.itemLocator = this.inventoryItems.filter({
      has: page.getByRole("link", { name: this.itemName }),
    });
    this.itemPriceText = this.itemLocator.locator(".inventory_item_price");
    this.itemLink = this.itemLocator
      .getByRole("link", { name: this.itemName })
      .filter({ hasText: this.itemName });
    this.itemAddToCart = this.itemLocator.getByRole("button", {
      name: "Add to cart",
    });
  }

  async testItems(item?: string) {
    if (item !== undefined) this.itemName = item;
    console.log(
      `this.inventoryItems.count() ==> ${await this.inventoryItems.count()}`
    );
    console.log(
      `this.itemLocator.count() ==> ${await this.itemLocator.count()}`
    );
    console.log(
      `this.itemPriceText.textContent() ==> ${await this.itemPriceText.innerText()}`
    );
    await this.itemAddToCart.click();
    await this.itemLink.click();
  }
}
