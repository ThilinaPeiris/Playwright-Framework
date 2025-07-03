import { type Page, type Locator, expect } from "@playwright/test";
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
    this.cartLink = this.page.getByRole("link", { name: "Cart", exact: true });
    this.logInLink = this.page.getByRole("link", { name: "Log in" });
    this.signUpLink = this.page.getByRole("link", { name: "Sign Up" });
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async clickHomePageLink() {
    await this.homePageLink.click();
    console.log('Clicked "Home Page" link.');
  }

  async clickContactLink() {
    await this.contactLink.click();
    console.log('Clicked "Contact" link.');
  }

  async clickAboutUsLink() {
    await this.aboutUsLink.click();
    console.log('Clicked "About Us" link.');
  }

  async clickCartLink() {
    await this.cartLink.click();
    console.log('Clicked "Cart" link.');
  }

  async clickLogInLink() {
    await this.logInLink.click();
    console.log('Clicked "Log In" link.');
  }

  async clickSignUpLink() {
    await this.signUpLink.click();
    console.log('Clicked "Sign up" link.');
  }

  async isVisible() {
    await expect(this.cartLink).toBeVisible();
  }
}
