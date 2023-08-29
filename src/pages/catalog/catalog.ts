/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import { GetProductsPublished } from '../../api/apiMethods';
import AsyncPage from '../../components/abstract/asyncPage';
import Router from '../../services/router/router';

export default class CatalogView extends AsyncPage {
  private errorModal: HTMLDialogElement;
  private catalog:
    | ClientResponse<ProductProjectionPagedQueryResponse>
    | undefined;

  constructor() {
    super();
    this.container.classList.add('catalog-container');
    this.errorModal = document.createElement('dialog');
    this.container.append(this.errorModal);
    this.errorModal.addEventListener('click', () => {
      this.errorModal.close();
    });
  }

  public async setCatalog(): Promise<void> {
    try {
      this.catalog = await GetProductsPublished();
      this.renderCatalog();
    } catch {
      (error: string): void => {
        this.errorModal.innerText = error;
        this.errorModal.showModal();
      };
    }
  }

  public getCatalog():
    | ClientResponse<ProductProjectionPagedQueryResponse>
    | undefined {
    return this.catalog;
  }

  private renderCatalog(): void {
    this.container.classList.remove('item-page');
    this.catalog?.body.results.forEach((catalogItem) => {
      const catalogItemLink = this.renderCatalogItemCard(catalogItem);
      this.container.append(catalogItemLink);
    });
  }

  private renderCatalogItemCard(catalogItem: ProductProjection): HTMLElement {
    const catalogItemLink = document.createElement('a');
    catalogItemLink.classList.add('card-item-link');
    catalogItemLink.href = `${Router.pages.catalog}/${catalogItem.id}`;

    const catalogItemCard = document.createElement('div');
    catalogItemCard.classList.add('catalog-card');
    catalogItemCard.setAttribute('data-id', catalogItem.id);

    const cardImage = document.createElement('div');
    cardImage.classList.add('catalog-card-image');
    if (catalogItem.masterVariant.images) {
      cardImage.style.background = `center / contain no-repeat url('${catalogItem.masterVariant.images[0].url}')`;
    }

    const cardName = document.createElement('h6');
    cardName.innerText = catalogItem.name.en;

    catalogItemCard.append(cardImage);
    catalogItemCard.append(cardImage, cardName);
    catalogItemLink.append(catalogItemCard);

    return catalogItemLink;
  }

  public renderItemPage(route: string): HTMLElement {
    // this.container.innerHTML = '';
    this.container.classList.add('item-page');
    const cardId = route.slice(9);
    console.log('id', cardId);
    if (this.verifiCardId(route, this.catalog)) {
      const chosenItem = this.catalog?.body.results.find(
        (catalogItem) => catalogItem.id === cardId
      );
      console.log('chosen', chosenItem);
      const itemPageImageContainer = document.createElement('div');
      itemPageImageContainer.classList.add('item-page-image-container');
      chosenItem?.masterVariant.images?.forEach((image) => {
        const itemPageImage = document.createElement('img');
        itemPageImage.classList.add('item-page-image');
        itemPageImage.src = `${image.url}`;
        itemPageImageContainer.append(itemPageImage);
      });

      const descriptionBlock = document.createElement('div');
      descriptionBlock.classList.add('item-page-description');

      this.container.innerHTML = '';
      this.container.append(itemPageImageContainer);
    } else {
      Router.navigate(Router.pages.notFound);
    }
    return this.container;
  }

  public verifiCardId(
    route: string,
    catalog: ClientResponse<ProductProjectionPagedQueryResponse> | undefined
  ): boolean {
    if (!catalog) {
      return false;
    }
    const catalogIds = catalog?.body.results.map(
      (catalogItem) => catalogItem.id
    );
    const cardId = route.slice(9);
    return catalogIds?.includes(cardId);
  }

  public async render(): Promise<HTMLElement> {
    this.container.innerHTML = '';
    await this.setCatalog();
    console.log('render catalog container', this.catalog);
    return this.container;
  }
}
