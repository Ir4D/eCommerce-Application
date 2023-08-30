/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import {
  GetProductsPublished,
  getProductCategories
} from '../../api/apiMethods';
import AsyncPage from '../../components/abstract/asyncPage';
import Router from '../../services/router/router';

export default class CatalogView extends AsyncPage {
  private errorModal: HTMLDialogElement;
  private catalog:
    | ClientResponse<ProductProjectionPagedQueryResponse>
    | undefined;
  private categories: ClientResponse<CategoryPagedQueryResponse> | undefined;

  constructor() {
    super();
    this.setCatalog();
    this.setCategories();
    this.container.classList.add('catalog-container');
    this.errorModal = document.createElement('dialog');
    this.container.append(this.errorModal);
    this.errorModal.addEventListener('click', () => {
      this.errorModal.close();
    });
  }

  private async setCatalog(): Promise<void> {
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

  private async setCategories(): Promise<void> {
    try {
      this.categories = await getProductCategories();
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

    /* catalog controls */
    const catalogControls = document.createElement('div');
    catalogControls.classList.add('catalog-controls');
    const categorySelect = document.createElement('select');
    categorySelect.classList.add('catalog-category-select');
    console.log('categories', this.categories);
    this.categories?.body.results.forEach((category) => {
      categorySelect.innerHTML += `<option>${category.name.en}</option>`;
    });
    catalogControls.append(categorySelect);
    this.container.append(catalogControls);

    /* cards container */
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('catalog-card-container');
    this.container.append(cardContainer);

    /* fill cards container */
    this.catalog?.body.results.forEach((catalogItem) => {
      const catalogItemLink = this.renderCatalogItemCard(catalogItem);
      cardContainer.append(catalogItemLink);
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
    this.container.innerHTML = '';
    this.container.classList.add('item-page');
    const cardId = route.slice(9);
    if (this.verifiCardId(route, this.catalog)) {
      const chosenItem = this.catalog?.body.results.find(
        (catalogItem) => catalogItem.id === cardId
      );
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
    // await this.setCategories();
    return this.container;
  }
}
