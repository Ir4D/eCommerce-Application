import HeaderView from "../components/header";
import MainView from "../components/main";
import FooterView from "../components/footer";
import Router from "../router/router";

export default class Layout {
  private header: HeaderView;
  private footer: FooterView;
  public slot: HTMLDivElement;

  private main: MainView;

  constructor() {
    this.header = new HeaderView();
    this.footer = new FooterView();
    this.main = new MainView();
    this.slot = document.createElement("div");
    this.handleRouteChange();
  }

  private renderPage(route: string): void {
    this.slot.innerHTML = "";
    let pageHTML: string;
    if (route) {
      switch (route) {
        case Router.pages[0].route: {
          pageHTML = this.main.render;
          break;
        }
        default: {
          pageHTML = `<div>404</div>`;
        }
      }
    } else {
      Router.push(Router.pages[0].route);
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
