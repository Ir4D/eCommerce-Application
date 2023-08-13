import Router from "../router/router";
import TemplateLayout from "./template-components/template-layout";
import TemplateMainPage from "./template-pages/main-page-template";
import TemplateLoginPage from "./template-pages/login-page-template";
import TemplateErrorPage from "./template-pages/error-page-template";

export default class AppTemplate {
  private container: HTMLElement;
  private templateLayout: TemplateLayout;
  private templateLoginPage: TemplateLoginPage;
  private templateMainPage: TemplateMainPage;
  private templateErrorPage: TemplateErrorPage;
  private slot: HTMLElement;

  constructor() {
    this.container = document.body;
    this.templateLayout = new TemplateLayout();
    this.templateMainPage = new TemplateMainPage();
    this.templateLoginPage = new TemplateLoginPage();
    this.templateErrorPage = new TemplateErrorPage();
    this.slot = document.createElement("div");
  }

  private renderPage(route: string): void {
    this.slot.innerHTML = "";
    let pageHTML: HTMLElement;
    if (route) {
      switch (route) {
        case Router.pages[0].route: {
          pageHTML = this.templateMainPage.render();
          break;
        }
        case Router.pages[1].route: {
          pageHTML = this.templateLoginPage.render();
          break;
        }
        default: {
          pageHTML = this.templateErrorPage.render();
        }
      }
    } else {
      Router.push(Router.pages[0].route);
      pageHTML = this.templateMainPage.render();
    }
    this.slot.append(pageHTML);
  }

  private handleRouteChange(): void {
    window.addEventListener("hashchange", () => {
      const { hash } = window.location;
      this.renderPage(hash);
    });
  }

  public start(): void {
    this.container.append(this.templateLayout.render());
    this.container.append(this.slot);
    this.renderPage(window.location.hash);
    this.handleRouteChange();
  }
}
