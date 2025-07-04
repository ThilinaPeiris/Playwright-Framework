import { type Page, type Locator, expect } from "@playwright/test";

export class OrderModal {
  private readonly modal: Locator;
  private readonly nameInput: Locator;
  private readonly countryInput: Locator;
  private readonly cityInput: Locator;
  private readonly cardInput: Locator;
  private readonly monthInput: Locator;
  private readonly yearInput: Locator;
  private readonly purchaseButton: Locator;
  private readonly confirmationModal: Locator;
  private readonly confirmationMessage: Locator;
  private readonly confirmationOkButton: Locator;

  constructor(public readonly page: Page) {
    this.modal = page.locator("#orderModal");
    this.nameInput = page.locator("#name");
    this.countryInput = page.locator("#country");
    this.cityInput = page.locator("#city");
    this.cardInput = page.locator("#card");
    this.monthInput = page.locator("#month");
    this.yearInput = page.locator("#year");
    this.purchaseButton = page.locator('button[onclick="purchaseOrder()"]');
    this.confirmationModal = page.locator(
      ".sweet-alert.showSweetAlert.visible"
    );
    this.confirmationMessage = this.confirmationModal.locator("h2");
    this.confirmationOkButton = this.confirmationModal.getByRole("button", {
      name: "OK",
    });
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async fillUserName(userName: string) {
    await this.nameInput.fill(userName);
  }

  async fillCountry(country: string) {
    await this.countryInput.fill(country);
  }

  async fillCity(city: string) {
    await this.cityInput.fill(city);
  }

  async fillCard(card: string) {
    await this.cardInput.fill(card);
  }

  async fillMonth(month: string) {
    await this.monthInput.fill(month);
  }

  async fillYear(year: string) {
    await this.yearInput.fill(year);
  }

  async clickPurchaseButton() {
    await this.purchaseButton.click();
  }

  async fillTheOrdersFormAsAStandardUser(
    userName: string,
    country: string,
    city: string,
    card: string,
    month: string,
    year: string
  ) {
    await this.fillUserName(userName);
    await this.fillCountry(country);
    await this.fillCity(city);
    await this.fillCard(card);
    await this.fillMonth(month);
    await this.fillYear(year);
  }

  async isVisible() {
    await expect(this.modal).toBeVisible();
  }

  async isOrderConfirmed() {
    await this.confirmationModal.waitFor({
      state: "visible",
    });
    //await expect(this.confirmationModalDialog).toBeVisible();
    await expect(this.confirmationMessage).toHaveText(
      "Thank you for your purchase!"
    );
  }

  async clickConfirmationOk() {
    await this.confirmationOkButton.waitFor({
      state: "visible",
      timeout: 10000,
    });
    await this.confirmationOkButton.click({ timeout: 5000 });
  }
}
