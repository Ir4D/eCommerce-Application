import {
  ClientResponse,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import { GetProductsPublished } from '../../api/apiMethods';
import Page from '../../components/abstract/page';
import Router from '../../services/router/router';

export default class CatalogView extends Page {
  // private container: HTMLElement;
  private errorModal: HTMLDialogElement;
  private catalog:
    | ClientResponse<ProductProjectionPagedQueryResponse>
    | undefined;

  constructor() {
    super();
    this.container.classList.add('catalog-container');
    this.errorModal = document.createElement('dialog');
    // this.getCatalog();
    this.container.append(this.errorModal);
    this.errorModal.addEventListener('click', () => {
      this.errorModal.close();
    });
  }

  private async getCatalog(): Promise<void> {
    GetProductsPublished()
      .then((body) => {
        this.catalog = body;
        this.renderCatalog(body);
        console.log('catalog', this.catalog);
      })
      .catch((error) => {
        // this.catalog = undefined;
        this.errorModal.innerText = error;
        this.errorModal.showModal();
      });
  }

  private renderCatalog(
    content: ClientResponse<ProductProjectionPagedQueryResponse>
  ): void {
    content.body.results.forEach((catalogItem) => {
      const catalogItemLink = document.createElement('a');
      catalogItemLink.classList.add('card-item-link');
      const catalogItemCard = document.createElement('div');
      catalogItemCard.classList.add('catalog-card');
      catalogItemLink.href = `${Router.pages.catalog}/${catalogItem.id}`;
      catalogItemCard.setAttribute('data-id', catalogItem.id);
      const cardHeader = document.createElement('h6');
      cardHeader.innerText = catalogItem.name.en;

      catalogItemCard.append(cardHeader);
      catalogItemLink.append(catalogItemCard);

      this.container.append(catalogItemLink);
    });
  }

  public renderItemPage(route: string): HTMLElement {
    // this.container.innerHTML = '';
    const catalogIds = this.catalog?.body.results.map((catalogItem) => {
      return catalogItem.id;
    });
    const cardId = route.slice(9);
    console.log('id', cardId);
    if (catalogIds?.includes(cardId)) {
      this.container.innerHTML = cardId;
    } else {
      Router.navigate(Router.pages.notFound);
    }
    console.log('render itemPage', route);
    // console.log('render itemPage container', this.container);
    console.log('render itemPage catalog', this.catalog);

    return this.container;
  }

  public async render(): Promise<HTMLElement> {
    this.container.innerHTML = '';
    await this.getCatalog();
    console.log('render catalog container', this.container);
    return this.container;
  }
}
