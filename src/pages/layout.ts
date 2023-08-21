import Router from '../services/router/router';
import HeaderView from '../components/header';
import FooterView from '../components/footer';
import MainView from './main/main';
import AboutView from './about/about';
import CatalogView from './catalog/catalog';
import LoginView from './login/login';
import SignupView from './signup/signup';
import NotFoundView from './404/404';

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

  constructor() {
    this.header = new HeaderView();
    this.footer = new FooterView();
    this.main = new MainView();
    this.about = new AboutView();
    this.catalog = new CatalogView();
    this.login = new LoginView();
    this.signup = new SignupView();
    this.notFound = new NotFoundView();
    this.slot = document.createElement('main');
    this.handleRouteChange();
    this.handleLogin();
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
          pageHTML = this.catalog.render;
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
        default: {
          pageHTML = this.notFound.render;
        }
      }
    } else {
      Router.navigate(Router.pages.main);
      pageHTML = this.main.render;
    }
    this.slot.innerHTML = pageHTML;
  }

  private handleRouteChange(): void {
    window.addEventListener('hashchange', () => {
      const { hash } = window.location;
      this.renderPage(hash);
    });
  }

  private handleLogin(): void {
    window.addEventListener('user-registration-success', () => {
      this.header.container.remove();
      this.header = new HeaderView();
      document.body.prepend(this.header.render());
    });
  }

  public render(container: HTMLElement): void {
    container.append(this.header.render());
    container.append(this.slot);
    container.append(this.footer.render());
    this.renderPage(window.location.hash);
  }
}
