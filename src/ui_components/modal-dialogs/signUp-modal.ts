import { type Page, type Locator, expect } from "@playwright/test";
import { Constants } from "../../utils/app-constants";

export class SignUpModal {
  private readonly modal: Locator;
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signUpButton: Locator;

  constructor(public readonly page: Page) {
    this.modal = page.locator("#signInModal");
    this.userNameInput = this.page.locator("#sign-username");
    this.passwordInput = this.page.locator("#sign-password");
    this.signUpButton = this.page.getByRole("button", { name: "Sign up" });
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

  async clickSignUpButton() {
    await this.signUpButton.click();
  }

  async signUpAs_A_StandardUser(userName: string, password: string) {
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.clickSignUpButton();
  }

  async isVisible() {
    await expect(this.modal).toBeVisible();
  }

  async isClosed() {
    await expect(this.modal).not.toBeVisible();
  }
}
