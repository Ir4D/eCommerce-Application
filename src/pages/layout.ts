import Router from "../services/router/router";
import HeaderView from "../components/header";
import FooterView from "../components/footer";
import MainView from "./main/main";
import AboutView from "./about/about";
import CatalogView from "./catalog/catalog";
import LoginView from "./login/login";
import NotFoundView from "./404/404";

export default class Layout {
  private header: HeaderView;
  private footer: FooterView;
  public slot: HTMLDivElement;

  private main: MainView;
  private about: AboutView;
  private catalog: CatalogView;
  private login: LoginView;
  private notFound: LoginView;

  constructor() {
    this.header = new HeaderView();
    this.footer = new FooterView();
    this.main = new MainView();
    this.about = new AboutView();
    this.catalog = new CatalogView();
    this.login = new LoginView();
    this.notFound = new NotFoundView();
    this.slot = document.createElement("div");
    this.handleRouteChange();
  }

  private renderPage(route: string): void {
    this.slot.innerHTML = "";
    let pageHTML: string;
    if (route) {
      switch (route) {
        case Router.pages.main.route: {
          pageHTML = this.main.render;
          break;
        }
        case Router.pages.about.route: {
          pageHTML = this.about.render;
          break;
        }
        case Router.pages.catalog.route: {
          pageHTML = this.catalog.render;
          break;
        }
        case Router.pages.login.route: {
          pageHTML = this.login.render;
          break;
        }
        default: {
          pageHTML = this.notFound.render;
        }
      }
    } else {
      Router.push(Router.pages.main.route);
      pageHTML = this.main.render;
    }
    this.slot.innerHTML = pageHTML;
  }

  private handleRouteChange(): void {
    window.addEventListener("hashchange", () => {
      const { hash } = window.location;
      this.renderPage(hash);
    });
  }

  public render(container: HTMLElement): void {
    container.append(this.header.render());
    container.append(this.slot);
    container.append(this.footer.render());
    this.renderPage(window.location.hash);
  }
}
