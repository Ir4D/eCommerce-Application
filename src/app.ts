import {
  createApiBuilderFromCtpClient,
  ClientResponse,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import { createCtpClient } from './api/BuildClients';
import { apiData } from './api/apiData';
import Layout from './pages/layout';

export default class App {
  public appContainer = document.querySelector<HTMLElement>('body');
  public menuIcon = this.appContainer?.querySelector('.nav-mobile');
  public nav = this.appContainer?.querySelector('.nav');
  public menuItems = this.appContainer?.querySelectorAll('.nav-item');

  public init(): void {
    if (!this.appContainer) throw new Error('error');
    new Layout().render(this.appContainer);

    this.menuIcon =
      this.appContainer?.querySelector<HTMLElement>('.nav-mobile');
    this.nav = this.appContainer?.querySelector<HTMLElement>('.nav');

    this.menuIcon?.addEventListener('click', (): void => this.toggleMenu());

    this.menuItems = this.appContainer?.querySelectorAll('.nav-item');
    this.menuItems.forEach((el) =>
      el.addEventListener('click', (): void => this.toggleMenu())
    );
  }

  private toggleMenu(): void {
    this.menuIcon?.classList.toggle('clicked');
    this.nav?.classList.toggle('show');
  }

  public runClient(): void {
    const apiRoot = createApiBuilderFromCtpClient(
      createCtpClient()
    ).withProjectKey({
      projectKey: apiData.PROJECT_KEY
    });
    const createClient = (): Promise<
      ClientResponse<ProductProjectionPagedQueryResponse>
    > => {
      return apiRoot.productProjections().get().execute();
    };
    createClient();
  }
}
