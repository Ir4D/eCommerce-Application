/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import FormSignup from "./form_signup";

class SignupPage {
  private container: HTMLElement;

  private signupForm: FormSignup;

  public static TextObject = {
    MainTitle: "Sign up Page"
  };

  constructor(id: string) {
    this.container = document.createElement("div");
    this.container.id = id;
    this.signupForm = new FormSignup();
  }

  public static createHeaderTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.innerHTML = text;
    return headerTitle;
  }

  public render() {
    const title = SignupPage.createHeaderTitle(SignupPage.TextObject.MainTitle);
    this.container.append(title);
    this.container.append(this.signupForm.render());
    return this.container;
  }
}

export default SignupPage;
