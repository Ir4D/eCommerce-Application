/* eslint-disable max-lines-per-function */
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
import ItemView from '../item/item';

export default class CatalogView extends Component {
  private errorModal: HTMLDialogElement;
  private currentCategory: string;
  private cardContainer: HTMLElement;
  private controls: HTMLFormElement;
  private item: ItemView;

  constructor() {
    super();
    this.container.classList.add('catalog-container');
    this.errorModal = document.createElement('dialog');
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('catalog-card-container');
    this.controls = document.createElement('form');
    this.controls.classList.add('catalog-controls');
    this.container.append(this.errorModal);
    this.errorModal.addEventListener('click', () => {
      this.errorModal.close();
    });
    this.currentCategory = 'All categories';
    this.item = new ItemView();
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

    const searchInput = document.createElement('input');
    searchInput.placeholder = 'Search...';
    searchInput.classList.add('catalog-search-input');
    searchInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      this.fillCardContainer(target.value);
    });

    const searchButton = document.createElement('button');
    searchButton.type = 'submit';
    searchButton.classList.add('catalog-search-button');

    const abcSortButton = document.createElement('button');
    const priceSortButton = document.createElement('button');
    const sortButtons = [abcSortButton, priceSortButton];
    sortButtons.forEach((button) => {
      button.classList.add('catalog-sort-button');
    });
    abcSortButton.classList.add('abc');
    priceSortButton.classList.add('price');

    this.controls.append(categorySelect);
    this.controls.append(searchInput);
    this.controls.append(searchButton);
    sortButtons.forEach((button) => {
      this.controls.append(button);
    });
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
    catalogItemLink.href = `${Router.pages.catalog}/${catalogItem.slug.en}`;

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

  private fillCardContainer(searchPattern?: string): void {
    const catalog = State.catalog?.body.results;
    const categories = State.categories?.body.results;
    this.cardContainer.innerHTML = '';
    const categoryMap: Map<string, string> = new Map();
    categories?.forEach((category) => {
      categoryMap.set(`${category.name.en}`, `${category.id}`);
    });
    let outputArr: ProductProjection[] | undefined;
    if (searchPattern) {
      outputArr = catalog?.filter((item) =>
        item.name.en.toLowerCase().includes(searchPattern.toLowerCase())
      );
    } else if (this.currentCategory === 'All categories') {
      outputArr = catalog;
    } else {
      outputArr = catalog?.filter((item) => {
        return item.categories.some(
          (category) => category.id === categoryMap.get(this.currentCategory)
        );
      });
    }

    outputArr?.forEach((catalogItem) => {
      const catalogItemLink = this.renderCatalogItemCard(catalogItem);
      this.cardContainer.append(catalogItemLink);
    });
  }

  public async renderItemPage(route: string): Promise<HTMLElement> {
    this.container.innerHTML = '';
    this.item = new ItemView();

    const cardId = route.slice(9);
    if (this.verifiCardId(route, State.catalog)) {
      const chosenItem = State.catalog?.body.results.find(
        (catalogItem) => catalogItem.slug.en === cardId
      );
      if (!chosenItem) throw new Error('error');
      this.container.append(await this.item.render(chosenItem));
    } else {
      Router.navigate(Router.pages.notFound);
    }
    return this.container;
  }

  private verifiCardId(
    route: string,
    catalog: ClientResponse<ProductProjectionPagedQueryResponse> | undefined
  ): boolean {
    if (!catalog) {
      return false;
    }
    const catalogIds = catalog?.body.results.map(
      (catalogItem) => catalogItem.slug.en
    );

    const cardId = route.slice(9);
    return catalogIds?.includes(cardId);
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';
    this.currentCategory = 'All categories';
    this.renderCatalog();
    return this.container;
  }
}
