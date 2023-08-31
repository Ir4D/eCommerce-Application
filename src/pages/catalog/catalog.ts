/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';

import Router from '../../services/router/router';
import State from '../../services/state';
import Component from '../../components/abstract/component';

type SortPatternType =
  | undefined
  | 'alphabet-dec'
  | 'alphabet-inc'
  | 'price-dec'
  | 'price-inc';

export default class CatalogView extends Component {
  private errorModal: HTMLDialogElement;
  private currentCategory: string;
  private sortPattern: SortPatternType;
  private cardContainer: HTMLElement;
  private controls: HTMLFormElement;
  private abcSortArrow: HTMLDivElement;
  private priceSortArrow: HTMLDivElement;

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
    this.abcSortArrow = document.createElement('div');
    this.priceSortArrow = document.createElement('div');
    [this.abcSortArrow, this.priceSortArrow].forEach((arrow) => {
      arrow.classList.add('catalog-sort-arrow');
    });
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
    [abcSortButton, priceSortButton].forEach((button) => {
      button.classList.add('catalog-sort-button');
    });
    abcSortButton.classList.add('abc');
    priceSortButton.classList.add('price');

    const deleteArrow = (arrow: HTMLDivElement): void => {
      arrow.classList.remove('increase');
      arrow.classList.remove('decrease');
    };

    const changeArrow = (
      arrow: HTMLDivElement,
      prev: string,
      curr: string
    ): void => {
      arrow.classList.remove(prev);
      arrow.classList.add(curr);
    };

    abcSortButton.addEventListener('click', () => {
      deleteArrow(this.priceSortArrow);
      if (!this.sortPattern) {
        this.sortPattern = 'alphabet-dec';
        this.abcSortArrow.classList.add('decrease');
        this.fillCardContainer();
      } else if (this.sortPattern === 'alphabet-inc') {
        this.sortPattern = 'alphabet-dec';
        changeArrow(this.abcSortArrow, 'increase', 'decrease');
        this.fillCardContainer();
      } else {
        this.sortPattern = 'alphabet-inc';
        changeArrow(this.abcSortArrow, 'decrease', 'increase');
        this.fillCardContainer();
      }
    });

    priceSortButton.addEventListener('click', () => {
      deleteArrow(this.abcSortArrow);
      if (!this.sortPattern) {
        this.sortPattern = 'price-dec';
        this.priceSortArrow.classList.add('decrease');
        this.fillCardContainer();
      } else if (this.sortPattern === 'price-inc') {
        this.sortPattern = 'price-dec';
        changeArrow(this.priceSortArrow, 'increase', 'decrease');
        this.fillCardContainer();
      } else {
        this.sortPattern = 'price-inc';
        changeArrow(this.priceSortArrow, 'decrease', 'increase');
        this.fillCardContainer();
      }
    });

    this.controls.append(
      categorySelect,
      searchInput,
      searchButton,
      abcSortButton,
      this.abcSortArrow,
      priceSortButton,
      this.priceSortArrow
    );
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

    const cardPrice = document.createElement('h6');
    if (catalogItem.masterVariant.prices) {
      cardPrice.innerText = JSON.stringify(
        Number(catalogItem.masterVariant.prices[0]?.value.centAmount) / 100
      );
    }
    catalogItemCard.append(cardImage, cardName, cardPrice);
    catalogItemLink.append(catalogItemCard);

    return catalogItemLink;
  }

  private fillCardContainer(searchPattern?: string): void {
    const sortByName = (
      catalog: ProductProjection[] | undefined
    ): ProductProjection[] | undefined => {
      catalog?.sort((a, b) => {
        if (a.name.en < b.name.en) {
          return -1;
        }
        if (a.name.en > b.name.en) {
          return 1;
        }
        return 0;
      });
      return catalog;
    };

    const catalog = State.catalog?.body.results;
    const categories = State.categories?.body.results;
    this.cardContainer.innerHTML = '';
    const categoryMap: Map<string, string> = new Map();
    categories?.forEach((category) => {
      categoryMap.set(`${category.name.en}`, `${category.id}`);
    });
    let outputArr: ProductProjection[] | undefined;
    if (this.currentCategory === 'All categories') {
      outputArr = catalog;
    } else {
      outputArr = catalog?.filter((item) => {
        return item.categories.some(
          (category) => category.id === categoryMap.get(this.currentCategory)
        );
      });
    }
    if (this.sortPattern) {
      switch (this.sortPattern) {
        case 'alphabet-dec': {
          sortByName(outputArr);
          break;
        }
        case 'alphabet-inc': {
          sortByName(outputArr)?.reverse();
          break;
        }
        case 'price-dec': {
          const undefinedPriceArr = outputArr?.filter((item) => {
            return !item.masterVariant.prices?.length;
          });
          const definedPriceArr = outputArr?.filter((item) => {
            return item.masterVariant.prices?.length;
          });
          definedPriceArr?.sort(
            (a, b) =>
              a.masterVariant.prices![0].value.centAmount -
              b.masterVariant.prices![0].value.centAmount
          );
          outputArr = [...definedPriceArr!, ...undefinedPriceArr!];
          break;
        }
        case 'price-inc': {
          const undefinedPriceArr = outputArr?.filter((item) => {
            return !item.masterVariant.prices?.length;
          });
          const definedPriceArr = outputArr?.filter((item) => {
            return item.masterVariant.prices?.length;
          });
          definedPriceArr
            ?.sort(
              (a, b) =>
                a.masterVariant.prices![0].value.centAmount -
                b.masterVariant.prices![0].value.centAmount
            )
            .reverse();
          outputArr = [...definedPriceArr!, ...undefinedPriceArr!];
          break;
        }
        default: {
          true;
        }
      }
    }
    if (searchPattern) {
      outputArr = catalog?.filter((item) =>
        item.name.en.toLowerCase().includes(searchPattern.toLowerCase())
      );
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

  private verifiCardId(
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
    this.container.innerHTML = '';
    this.currentCategory = 'All categories';
    this.renderCatalog();
    return this.container;
  }
}
