import type { Page, Locator } from "@playwright/test";
import { Constants } from "../utils/app-constants";

export class HomePage {
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly logInButton: Locator;

  constructor(public readonly page: Page) {
    this.userNameInput = this.page.locator("#user-name");
    this.passwordInput = this.page.locator("#password");
    this.logInButton = this.page.locator("#login-button");
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
}
