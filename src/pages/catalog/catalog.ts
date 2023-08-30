/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';

import Router from '../../services/router/router';
import State from '../../services/state';
import Component from '../../components/abstract/component';

export default class CatalogView extends Component {
  private errorModal: HTMLDialogElement;
  private currentCategory: string;
  private cardContainer: HTMLElement;
  private controls: HTMLElement;

  constructor() {
    super();
    this.container.classList.add('catalog-container');
    this.errorModal = document.createElement('dialog');
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('catalog-card-container');
    this.controls = document.createElement('div');
    this.controls.classList.add('catalog-controls');
    this.container.append(this.errorModal);
    this.errorModal.addEventListener('click', () => {
      this.errorModal.close();
    });
    this.currentCategory = 'All categories';
  }

  private renderCatalog(): void {
    this.container.classList.remove('item-page');

    /* catalog controls */
    this.controls.innerHTML = '';
    const categorySelect = document.createElement('select');
    categorySelect.classList.add('catalog-category-select');
    categorySelect.innerHTML = `<option data-id="all">All categories</option>`;
    State.categories?.body.results.forEach((category) => {
      categorySelect.innerHTML += `<option data-id="${category.id}">${category.name.en}</option>`;
    });
    categorySelect.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      this.currentCategory = target.value;
      this.fillCardContainer();
    });
    this.controls.append(categorySelect);
    this.container.append(this.controls);

    /* cards container */
    this.container.append(this.cardContainer);
    this.cardContainer.innerHTML = '';

    /* fill cards container */
    this.fillCardContainer();
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
    if (catalogItem.masterVariant.images?.length) {
      cardImage.style.background = `center / contain no-repeat url('${catalogItem.masterVariant.images[0].url}')`;
    }

    const cardName = document.createElement('h6');
    cardName.innerText = catalogItem.name.en;

    catalogItemCard.append(cardImage);
    catalogItemCard.append(cardImage, cardName);
    catalogItemLink.append(catalogItemCard);

    return catalogItemLink;
  }

  private fillCardContainer(): void {
    this.cardContainer.innerHTML = '';
    const categoryMap: Map<string, string> = new Map();
    State.categories?.body.results.forEach((category) => {
      categoryMap.set(`${category.name.en}`, `${category.id}`);
    });
    let outputArr: ProductProjection[] | undefined;
    if (this.currentCategory === 'All categories') {
      outputArr = State.catalog?.body.results;
    } else {
      outputArr = State.catalog?.body.results.filter((item) => {
        return item.categories.some(
          (cat) => cat.id === categoryMap.get(this.currentCategory)
        );
      });
    }
    outputArr?.forEach((catalogItem) => {
      const catalogItemLink = this.renderCatalogItemCard(catalogItem);
      this.cardContainer.append(catalogItemLink);
    });
  }

  public renderItemPage(route: string): HTMLElement {
    this.container.innerHTML = '';
    this.container.classList.add('item-page');
    const cardId = route.slice(9);
    if (this.verifiCardId(route, State.catalog)) {
      const chosenItem = State.catalog?.body.results.find(
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

  public render(): HTMLElement {
    console.log('component state', State.catalog);
    this.container.innerHTML = '';
    this.renderCatalog();
    return this.container;
  }
}
