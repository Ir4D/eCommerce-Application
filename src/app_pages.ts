/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import Header from "./header";
import MainPage from "./page_main";
import LoginPage from "./page_login";
import SignupPage from "./page_signup";
import { GetProductsPublished } from "./flow_anonymous_client";

class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId = "current-page";

  private header: Header;

  public static createNewPage(pageId: string): void {
    const currentPageHtml = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHtml) {
      currentPageHtml.remove();
    }
    let page = null;

    if (pageId === "main") {
      page = new MainPage(pageId);
    } else if (pageId === "signup") {
      page = new SignupPage(pageId);
    } else if (pageId === "login") {
      page = new LoginPage(pageId);
    }

    if (page) {
      const pageHtml = page.render();
      pageHtml.id = App.defaultPageId;
      App.container.append(pageHtml);
    }
  }

  public static routeChange(): void {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      App.createNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header("header", "header");
  }

  public static clientChange(): void {
    const LOGIN_PAGE = document.querySelector(".login");
    const SIGNUP_PAGE = document.querySelector(".signup");
    LOGIN_PAGE?.addEventListener("click", () => {
      GetProductsPublished();
    });
    SIGNUP_PAGE?.addEventListener("click", () => {
      GetProductsPublished();
    });
  }

  public run(): void {
    App.container.append(this.header.render());
    App.createNewPage("main");
    App.routeChange();
    App.clientChange();
  }
}

export default App;
