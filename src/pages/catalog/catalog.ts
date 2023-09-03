/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import Router from '../../services/router/router';
import State from '../../services/state';
import Component from '../../components/abstract/component';
import ItemView from '../item/item';

Swiper.use([Navigation, Pagination]);

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
  private paginationBar: HTMLElement;

  constructor() {
    super();
    this.container.classList.add('catalog-container');
    this.errorModal = document.createElement('dialog');
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('catalog-card-container');
    this.controls = document.createElement('form');
    this.controls.classList.add('catalog-controls');
    this.container.append(this.errorModal);
    this.paginationBar = document.createElement('div');
    this.paginationBar.classList.add('catalog-pagination-bar');
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

    const searchGroup = document.createElement('div');
    searchGroup.classList.add('catalog-controls-search-group');

    const searchInput = document.createElement('input');
    searchInput.placeholder = 'Search...';
    searchInput.classList.add('catalog-search-input');
    searchInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      this.fillCardContainer(target.value);
    });

    const searchButton = document.createElement('button');
    // searchButton.type = 'submit';
    searchButton.classList.add('catalog-search-button');

    searchGroup.append(searchInput, searchButton);

    const abcSortButton = document.createElement('button');
    const priceSortButton = document.createElement('button');
    [abcSortButton, priceSortButton].forEach((button) => {
      button.classList.add('catalog-sort-button');
    });
    abcSortButton.classList.add('abc');
    priceSortButton.classList.add('price');

    const abcSortGroup = document.createElement('div');
    const priceSortGroup = document.createElement('div');
    abcSortGroup.append(abcSortButton, this.abcSortArrow);
    priceSortGroup.append(priceSortButton, this.priceSortArrow);
    [abcSortGroup, priceSortGroup].forEach((div) => {
      div.classList.add('catalog-controls-sort-group');
    });
    abcSortGroup.append(abcSortButton, this.abcSortArrow);
    priceSortGroup.append(priceSortButton, this.priceSortArrow);

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
      searchGroup,
      abcSortGroup,
      priceSortGroup
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
    catalogItemLink.href = `${Router.pages.catalog}/${catalogItem.slug.en}`;

    const categoryButton = document.createElement('div');
    categoryButton.classList.add('catalog-card-category-button');
    if (catalogItem.categories[0]) {
      for (const [key, value] of State.CategoryMap.entries()) {
        if (value === catalogItem.categories[0].id) {
          categoryButton.innerText = key;
        }
      }
    } else {
      categoryButton.innerText = 'No category';
    }

    const cardImage = document.createElement('div');
    cardImage.classList.add('catalog-card-image');
    if (catalogItem.masterVariant.images?.length) {
      cardImage.style.background = `center / contain no-repeat url('${catalogItem.masterVariant.images[0].url}') #ffff`;
    }

    const cardName = document.createElement('p');
    cardName.classList.add('catalog-catd-title');
    cardName.innerText = catalogItem.name.en;

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');
    const cardPrice = document.createElement('span');
    cardPrice.classList.add('catalog-card-price');
    if (
      catalogItem.masterVariant.prices?.length &&
      catalogItem.masterVariant.prices[0].discounted
    ) {
      const fullPrice = document.createElement('span');
      fullPrice.innerText = `€${(
        Number(catalogItem.masterVariant.prices[0]?.value.centAmount) / 100
      ).toFixed(2)}`;
      const discountIcon = document.createElement('span');
      discountIcon.classList.add('catalog-card-discount-icon');
      priceContainer.append(fullPrice, discountIcon);
      fullPrice.classList.add('catalog-card-price', 'full');
      cardPrice.innerText = `€${(
        Number(
          catalogItem.masterVariant.prices[0].discounted.value.centAmount
        ) / 100
      ).toFixed(2)}`;
    } else if (catalogItem.masterVariant.prices) {
      cardPrice.innerText = `€${(
        Number(catalogItem.masterVariant.prices[0]?.value.centAmount) / 100
      ).toFixed(2)}`;
    }
    priceContainer.append(cardPrice);

    catalogItemLink.append(categoryButton, cardImage, cardName, priceContainer);

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

    const sortByPrice = (
      catalog: ProductProjection[] | undefined
    ): ProductProjection[] | undefined => {
      const undefinedPriceArr = catalog?.filter((item) => {
        return !item.masterVariant.prices?.length;
      });
      let definedPriceArr = catalog?.filter((item) => {
        return item.masterVariant.prices?.length;
      });

      const sortPricesArr: [number, ProductProjection][] | undefined =
        definedPriceArr?.map((product) => {
          const sortPrice = product.masterVariant.prices![0].discounted
            ? product.masterVariant.prices![0].discounted.value.centAmount
            : product.masterVariant.prices![0].value.centAmount;
          return [sortPrice, product];
        });
      sortPricesArr?.sort((a, b) => a[0] - b[0]);
      definedPriceArr = sortPricesArr?.map((item) => item[1]);

      catalog = [...definedPriceArr!, ...undefinedPriceArr!];
      return catalog;
    };

    const catalog = State.catalog?.body.results;
    this.cardContainer.innerHTML = '';
    let outputArr: ProductProjection[] | undefined;
    if (this.currentCategory === 'All categories') {
      outputArr = catalog;
    } else {
      outputArr = catalog?.filter((item) => {
        return item.categories.some(
          (category) =>
            category.id === State.CategoryMap.get(this.currentCategory)
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
          outputArr = sortByPrice(outputArr);
          break;
        }
        case 'price-inc': {
          outputArr = sortByPrice(outputArr)?.reverse();
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

  public async renderItemPage(route: string): Promise<HTMLElement> {
    this.container.innerHTML = '';

    const cardId = route.slice(9);
    if (this.verifiCardId(route, State.catalog)) {
      const chosenItem = State.catalog?.body.results.find(
        (catalogItem) => catalogItem.slug.en === cardId
      );
      if (!chosenItem) throw new Error('error');

      const item = new ItemView(chosenItem);
      this.container.append(await item.render());
      this.createSlides();
    } else {
      Router.navigate(Router.pages.notFound);
    }

    const slider = document.querySelector('.swiper');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body?.append(overlay);

    swiperWrapper?.addEventListener('click', () => {
      // console.log('modal')
      slider?.classList.toggle('showModal');
      overlay?.classList.toggle('visible');
      body?.classList.toggle('stop-scroll');
    });

    overlay.addEventListener('click', () => {
      slider?.classList.toggle('showModal');
      overlay?.classList.toggle('visible');
      body?.classList.toggle('stop-scroll');
    });

    // console.log(document.querySelector('.swiper'))
    return this.container;
  }

  private createSlides(): void {
    const swiper = new Swiper('.swiper', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      loop: true
    });
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
