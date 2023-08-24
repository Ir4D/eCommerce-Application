/* eslint-disable max-lines-per-function */
import Router from '../services/router/router';
import HeaderView from '../components/header';
import FooterView from '../components/footer';
import MainView from './main/main';
import AboutView from './about/about';
import CatalogView from './catalog/catalog';
import LoginView from './login/login';
import SignupView from './signup/signup';
import NotFoundView from './404/404';
import CartView from './cart/cart';

export default class Layout {
  private header: HeaderView;
  private footer: FooterView;
  private slot: HTMLElement;

  private main: MainView;
  private about: AboutView;
  private catalog: CatalogView;
  private login: LoginView;
  private signup: SignupView;
  private notFound: NotFoundView;
  private cart: CartView;

  constructor() {
    this.header = new HeaderView();
    this.footer = new FooterView();
    this.main = new MainView();
    this.about = new AboutView();
    this.catalog = new CatalogView();
    this.login = new LoginView();
    this.signup = new SignupView();
    this.notFound = new NotFoundView();
    this.cart = new CartView();
    this.slot = document.createElement('main');
    this.handleRouteChange();
  }

  private renderPage(route: string): void {
    this.slot.innerHTML = '';
    let pageHTML: string;
    if (route) {
      switch (route) {
        case Router.pages.main: {
          pageHTML = this.main.render;
          break;
        }
        case Router.pages.about: {
          pageHTML = this.about.render;
          break;
        }
        case Router.pages.catalog: {
          pageHTML = '';
          break;
        }
        case Router.pages.login: {
          pageHTML = this.login.render;
          break;
        }
        case Router.pages.signup: {
          pageHTML = this.signup.render;
          break;
        }
        case Router.pages.cart: {
          pageHTML = this.cart.render;
          break;
        }
        default: {
          Router.navigate(Router.pages.notFound);
          pageHTML = this.notFound.render;
        }
      }
    } else {
      Router.navigate(Router.pages.main);
      pageHTML = this.main.render;
    }
    if (route === Router.pages.catalog) {
      this.slot.append(this.catalog.render());
    } else {
      this.slot.innerHTML = pageHTML;
    }
  }

  private handleRouteChange(): void {
    window.addEventListener('hashchange', () => {
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
