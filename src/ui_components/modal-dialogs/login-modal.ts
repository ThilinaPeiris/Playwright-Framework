import { type Page, type Locator, expect } from "@playwright/test";

export class LoginModal {
  private readonly modal: Locator;
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly logInButton: Locator;

  constructor(public readonly page: Page) {
    this.modal = page.locator("#logInModal");
    this.userNameInput = this.page.locator("#loginusername");
    this.passwordInput = this.page.locator("#loginpassword");
    this.logInButton = this.page.getByRole("button", { name: "Log in" });
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async fillUserName(userName: string) {
    await this.userNameInput.fill(userName);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.logInButton.click();
  }

  async loginAs_A_StandardUser(userName: string, password: string) {
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async isVisible() {
    await expect(this.modal).toBeVisible();
    console.log("Log in modal is visible.");
  }
}
