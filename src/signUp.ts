/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import { CreateCustomer } from "./flow_password_client";

class FormHandler {
  private form: HTMLElement;
  private emailInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;

  constructor(formSelector: string) {
    this.form = document.querySelector(formSelector) as HTMLElement;
    this.emailInput = document.querySelector(".signup-email") as HTMLInputElement;
    this.passwordInput = document.querySelector(".signup-psw") as HTMLInputElement;

    this.form?.addEventListener("click", this.handleSubmit.bind(this));
  }

  public handleSubmit(event: Event): void {
    event.preventDefault();

    const email = this.emailInput?.value;
    const password = this.passwordInput?.value;

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("1111");

    CreateCustomer(email, password);
  }
}

export default FormHandler;
