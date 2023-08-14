/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import FormLogin from "./form_login";

class LoginPage {
  private container: HTMLElement;

  private loginForm: FormLogin;

  public static TextObject = {
    MainTitle: "Log in Page"
  };

  constructor(id: string) {
    this.container = document.createElement("div");
    this.container.id = id;
    this.loginForm = new FormLogin();
  }

  public static createHeaderTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.innerHTML = text;
    return headerTitle;
  }

  public render() {
    const title = LoginPage.createHeaderTitle(LoginPage.TextObject.MainTitle);
    this.container.append(title);
    this.container.append(this.loginForm.render());
    return this.container;
  }
}

export default LoginPage;
