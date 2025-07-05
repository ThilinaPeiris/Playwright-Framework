# BlazeDemo Playwright Automation Framework

### (blazeDemo-softOne Branch)

This repository, specifically the `blazeDemo-softOne` branch, presents a robust and well-structured automation framework built using the Playwright library. It is designed to automate end-to-end testing for the BlazeDemo web application.

## **Project Overview**

The `blazeDemo-softOne` branch focuses on demonstrating practical test automation principles applied to a common demo website. It serves as an excellent reference for understanding how to set up, organize, and execute automated tests with Playwright for web applications.

### **Key Features**

This Playwright automation framework includes the following notable features:

- **End-to-End Test Automation**: Comprehensive test scenarios covering user journeys on the BlazeDemo website, from product search to purchase confirmation.

- **Playwright Integration**: Leverages the full power of Playwright for fast, reliable, and headless browser automation across Chromium, Firefox, and WebKit.

- **Page Object Model (POM) Implementation**: Adopts the Page Object Model design pattern for maintaining clean, readable, and reusable test code. Each web page or significant component has its dedicated page object, separating test logic from element locators.

- **Modular Test Structure**: Tests are organized logically, making it easy to understand, maintain, and extend the test suite.

- **Assertions for Validation**: Utilizes Playwright's built-in assertion capabilities to validate expected outcomes and ensure application correctness.

- **Cross-Browser Compatibility**: Configured to run tests across multiple browsers, ensuring consistent application behavior.

- **Configurable Environment**: Allows for easy configuration of test environments (e.g., base URL), making the framework adaptable to different deployment stages.

- **Reporting Capabilities**: Integration with a reporting mechanism (e.g., Playwright's default HTML reporter or a custom one) to provide clear and actionable test results.

- **Error Handling & Robustness**: Designed with considerations for handling common automation challenges, leading to more stable and less flaky tests.

## **Getting Started**

To get this project up and running locally, you typically need to:

1.  **Clone the Repository**:

    Bash

    ```
    git clone https://github.com/ThilinaPeiris/Playwright-Framework.git
    cd Playwright-Framework
    git checkout blazeDemo-softOne

    ```

2.  **Install Dependencies**:

    Bash

    ```
    npm install # or yarn install, depending on the project's package manager
    npm install -D typescript @types/node # Install TypeScript and Node.js types
    npx playwright install # to install browser binaries

    ```

3.  **Run Tests**:

    Bash

    ```
    npx playwright test

    ```

This framework provides a solid foundation for anyone looking to implement or learn about robust web automation using Playwright.
