export class Utilities {
  constructor() {}

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  getRandomUserName() {
    return (
      "bhagy91-" +
      this.getRandomInt(10000, 99999) +
      "-" +
      this.getRandomInt(1000, 10000)
    );
  }
  getRandomPassword() {
    return (
      "@blaze-" +
      this.getRandomInt(10000, 99999) +
      "-" +
      this.getRandomInt(1000, 10000)
    );
  }
}
