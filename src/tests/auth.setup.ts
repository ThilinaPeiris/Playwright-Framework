// tests/saveLoginState.spec.ts
import { test as setup } from "../fixtures/custom-fixtures";
import { Constants } from "../utils/app-constants";
import { Utilities } from "../utils/utilities";

setup(
  "Save login state for Demoblaze",
  async ({ page, homePage, signUpModal, loginModal, headerSection }) => {
    // Define your test user credentials
    const utilitiesObj: Utilities = new Utilities();
    let name: string = utilitiesObj.getRandomUserName();
    let pass: string = utilitiesObj.getRandomPassword();

    console.log("Navigating to Demoblaze home page...");
    await homePage.goto(Constants.BASEURL);

    console.log("Sign Up as a standard user...");
    await headerSection.clickSignUpLink();
    await signUpModal.signUpAs_A_StandardUser(name, pass);

    console.log("Login with the given credentials..");
    await headerSection.clickLogInLink();
    await loginModal.loginAs_A_StandardUser(name, pass);

    // Save the storage state to a file
    // This captures cookies, local storage, and session storage.
    const storageStatePath = "playwright-auth-state.json";
    await page.context().storageState({ path: storageStatePath });
    console.log(`Login state saved to ${storageStatePath}`);
  }
);
