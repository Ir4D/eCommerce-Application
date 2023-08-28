/* eslint-disable max-lines-per-function */
import {
  ClientResponse,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
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
import { GetProductsPublished } from '../api/apiMethods';

export default class Layout {
  private header: HeaderView;
  private footer: FooterView;
  private slot: HTMLElement;
  private catalogBase:
    | ClientResponse<ProductProjectionPagedQueryResponse>
    | undefined;

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
    // this.catalogBase = this.catalog.getCatalog();
    this.handleRouteChange();
  }

  private async renderPage(route: string): Promise<void> {
    // this.slot.innerHTML = '';
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
          this.slot.innerHTML = '';
          this.slot.append(await this.catalog.render());
          console.log('catalog', route);
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
          console.log('default', route);
          if (route.includes('catalog/')) {
            const cardId = route.slice(9);
            const catalogBase = await GetProductsPublished();
            console.log(
              'from layout',
              this.catalogBase,
              cardId,
              this.catalog.verifiCardId(route, this.catalog.getCatalog())
            );
            if (this.catalog.verifiCardId(route, catalogBase)) {
              pageHTML = '';
              this.slot.append(this.catalog.renderItemPage(route));
            } else {
              pageHTML = this.notFound.render;
            }
          } else {
            pageHTML = this.notFound.render;
          }
        }
      }
    } else {
      Router.navigate(Router.pages.main);
      pageHTML = this.main.render;
    }
    if (!route.includes(Router.pages.catalog)) {
      this.slot.innerHTML = pageHTML;
    }
  }

  private handleRouteChange(): void {
    window.addEventListener('hashchange', this.routeChange);
  }

  private routeChange = (): void => {
    const { hash } = window.location;
    this.renderPage(hash);
  };

  public render(container: HTMLElement): void {
    container.append(this.header.render());
    container.append(this.slot);
    container.append(this.footer.render());
    this.renderPage(window.location.hash);
  }
}