import type { Page, Locator } from "@playwright/test";
import { Constants } from "../../utils/app-constants";

export class HeaderSection {
  private readonly homePageLink: Locator;
  private readonly contactLink: Locator;
  private readonly aboutUsLink: Locator;
  private readonly cartLink: Locator;
  private readonly logInLink: Locator;
  private readonly signUpLink: Locator;

  constructor(public readonly page: Page) {
    this.homePageLink = this.page.getByRole("link", { name: "Home" });
    this.contactLink = this.page.getByRole("link", { name: "Contact" });
    this.aboutUsLink = this.page.getByRole("link", { name: "About Us" });
    this.cartLink = this.page.getByRole("link", { name: "Cart" });
    this.logInLink = this.page.getByRole("link", { name: "Log in" });
    this.signUpLink = this.page.getByRole("link", { name: "Sign Up" });
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async clickhomePageLink() {
    await this.homePageLink.click();
  }

  async clickcontactLink() {
    await this.contactLink.click();
  }

  async clickaboutUsLink() {
    await this.aboutUsLink.click();
  }

  async clickcartLink() {
    await this.cartLink.click();
  }

  async clicklogInLink() {
    await this.logInLink.click();
  }

  async clicksignUpLink() {
    await this.signUpLink.click();
  }
}
