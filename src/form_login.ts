/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { apiData, apiDataPassword } from "./apiData";
// import { AuthenticateCustomer } from "./flow_password_client";

class FormLogin {
  private container: HTMLElement;

  private labelEmail: HTMLLabelElement;

  private inputEmail: HTMLInputElement;

  private labelPass: HTMLLabelElement;

  private inputPass: HTMLInputElement;

  constructor() {
    this.container = document.createElement("div");
    this.container.className = "login-container";

    this.labelEmail = document.createElement("label");
    this.labelEmail.setAttribute("for", "email");
    this.labelEmail.textContent = "Email";

    this.inputEmail = document.createElement("input");
    this.inputEmail.type = "text";
    this.inputEmail.placeholder = "Enter Email";
    this.inputEmail.name = "email";
    this.inputEmail.setAttribute("required", "true");
    this.inputEmail.className = "login-email";

    this.labelPass = document.createElement("label");
    this.labelPass.setAttribute("for", "psw");
    this.labelPass.textContent = "Password";

    this.inputPass = document.createElement("input");
    this.inputPass.type = "password";
    this.inputPass.placeholder = "Enter Password";
    this.inputPass.name = "psw";
    this.inputPass.setAttribute("required", "true");
    this.inputPass.className = "login-psw";
  }

  public async createBtn() {
    const button = document.createElement("button");
    button.className = "login-submit";
    button.textContent = "Log in";
    button.addEventListener("click", async () => {
      const emailInput = this.inputEmail.value;
      const passInput = this.inputPass.value;

      console.log(emailInput);
      console.log(passInput);
      console.log("login customer");

      // AuthenticateCustomer(emailInput, passInput);

      const projectKey = apiData.PROJECT_KEY || "";
      const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host: apiData.API_URL || "",
        fetch
      };

      const authPasswordOptions: PasswordAuthMiddlewareOptions = {
        host: apiData.AUTH_URL || "",
        projectKey,
        credentials: {
          clientId: apiDataPassword.CLIENT_ID || "",
          clientSecret: apiDataPassword.CLIENT_SECRET || "",
          user: {
            username: emailInput,
            password: passInput
          }
        },
        scopes: [apiDataPassword.SCOPES || ""],
        fetch
      };

      const ctpClientPassword = new ClientBuilder()
        .withProjectKey(projectKey)
        .withPasswordFlow(authPasswordOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();

      const apiRoot = createApiBuilderFromCtpClient(ctpClientPassword).withProjectKey({
        projectKey: apiData.PROJECT_KEY
      });

      const authenticateCustomer = () => {
        return apiRoot
          .me()
          .login()
          .post({
            body: {
              email: emailInput,
              password: passInput
            }
          })
          .execute();
      };

      authenticateCustomer()
        .then(({ body }) => {
          console.log(body.customer.id);
          console.log(body.customer.email);
        })
        .catch(console.error);
    });

    this.container.append(this.labelEmail, this.inputEmail, this.labelPass, this.inputPass, button);
    document.body.append(this.container);
  }

  public render() {
    this.createBtn();
    return this.container;
  }
}

export default FormLogin;
