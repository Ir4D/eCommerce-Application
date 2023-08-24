import {
  ClientResponse,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import { GetProductsPublished } from '../../api/apiMethods';
import Component from '../../components/abstract/component';

export default class CatalogView extends Component {
  // private container: HTMLElement;
  private errorModal: HTMLDialogElement;
  // private content: ClientResponse<ProductProjectionPagedQueryResponse>;

  constructor() {
    super();
    this.container.classList.add('catalog-container');
    this.errorModal = document.createElement('dialog');
    // this.errorModal.innerText = 'error';
    this.refreshCatalog();
  }

  public refreshCatalog(): void {
    GetProductsPublished()
      .then((body) => {
        this.renderCatalog(body);
      })
      .catch((error) => {
        this.errorModal.innerText = error;
        this.errorModal.showModal();
      });
  }

  private renderCatalog(
    content: ClientResponse<ProductProjectionPagedQueryResponse>
  ): void {
    content.body.results.forEach((catalogItem) => {
      const catalogItemCard = document.createElement('div');
      catalogItemCard.classList.add('catalog-card');
      catalogItemCard.innerHTML = `<h2>${catalogItem.name.en}</h2>`;
      this.container.append(catalogItemCard);
    });
    // this.container.innerHTML = JSON.stringify(content.body.results);
  }

  public render(): HTMLElement {
    return this.container;
  }
}
