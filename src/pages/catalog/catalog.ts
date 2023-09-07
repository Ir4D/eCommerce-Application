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

type PaginationBarType = {
  backButton: HTMLElement;
  forwardButton: HTMLElement;
  currentPageSpan: HTMLElement;
};

type PaginationDirection = '+' | '-';

export default class CatalogView extends Component {
  private errorModal: HTMLDialogElement;
  private cardContainer: HTMLElement;
  private currentCategory: string;
  private sortPattern: SortPatternType;
  private abcSortArrow: HTMLDivElement;
  private priceSortArrow: HTMLDivElement;
  private priceFloor: number;
  private priceCeli: number;
  private currentPage: number;
  private paginationControls: PaginationBarType;

  constructor() {
    super();
    this.container.classList.add('catalog-container');
    this.errorModal = document.createElement('dialog');
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('catalog-card-container');
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
    this.priceFloor = 0;
    this.priceCeli = Infinity;
    this.currentPage = 1;
    this.paginationControls = {
      backButton: document.createElement('div'),
      forwardButton: document.createElement('div'),
      currentPageSpan: document.createElement('span')
    };
    this.paginationControls.backButton.addEventListener('click', () => {
      this.setCurrentPage('-');
    });
    this.paginationControls.forwardButton.addEventListener('click', () => {
      this.setCurrentPage('+');
    });
  }

  private renderCatalog(): void {
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

    this.container.classList.remove('item-page');

    /* catalog controls */
    const catalogHeader = document.createElement('div');
    catalogHeader.classList.add('catalog-header');
    const navGroup = document.createElement('div');
    navGroup.classList.add('catalog-nav-group', 'hiden');
    const filterTitle = document.createElement('span');
    filterTitle.classList.add('catalog-filter-title');
    filterTitle.innerText = 'Filters';
    filterTitle.addEventListener('click', () => {
      navGroup.classList.toggle('hiden');
      filterTitle.classList.toggle('open');
    });
    const controls = document.createElement('form');
    controls.classList.add('catalog-controls');

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

    const priceRangeGroup = document.createElement('div');
    priceRangeGroup.classList.add('catalog-controls-range-group');
    const titleSpan = document.createElement('span');
    const betweenSpan = document.createElement('span');
    titleSpan.innerText = 'Price filter';
    betweenSpan.innerText = '-';
    [titleSpan, betweenSpan].forEach((span) => {
      span.classList.add('catalog-controls-range-span');
    });
    const priceFloorInput = document.createElement('input');
    const priceCeliInput = document.createElement('input');
    [priceFloorInput, priceCeliInput].forEach((input) => {
      input.classList.add('catalog-controls-range-input');
      input.type = 'number';
    });

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

    priceFloorInput.addEventListener('input', () => {
      this.priceFloor = Number(priceFloorInput.value);
      this.fillCardContainer();
    });

    priceCeliInput.addEventListener('input', () => {
      this.priceCeli = Number(priceCeliInput.value) || Infinity;
      this.fillCardContainer();
    });

    controls.append(categorySelect, searchGroup, abcSortGroup, priceSortGroup);

    navGroup.append(controls, priceRangeGroup);
    priceRangeGroup.append(
      titleSpan,
      priceFloorInput,
      betweenSpan,
      priceCeliInput
    );

    catalogHeader.append(filterTitle, navGroup);
    this.container.append(catalogHeader);

    /* cards container */
    this.container.append(this.cardContainer);
    this.cardContainer.innerHTML = '';

    /* fill cards container */
    this.fillCardContainer();

    /* paggination bar */
    const paginationBar = document.createElement('nav');
    paginationBar.classList.add('catalog-pagination-bar');
    this.paginationControls.currentPageSpan.classList.add(
      'catalog-current-page-span'
    );
    [
      this.paginationControls.backButton,
      this.paginationControls.forwardButton
    ].forEach((button) => {
      button.classList.add('catalog-pagination-button');
    });
    this.paginationControls.backButton.innerText = '<<';
    this.paginationControls.forwardButton.innerText = '>>';

    paginationBar.append(
      this.paginationControls.backButton,
      this.paginationControls.currentPageSpan,
      this.paginationControls.forwardButton
    );
    this.container.append(paginationBar);
    this.fillPaginationBar();
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
    outputArr = outputArr?.filter(
      (item) =>
        (item.masterVariant.prices![0].discounted?.value.centAmount ||
          item.masterVariant.prices![0].value.centAmount) /
          100 >=
          this.priceFloor &&
        (item.masterVariant.prices![0].discounted?.value.centAmount ||
          item.masterVariant.prices![0].value.centAmount) /
          100 <=
          this.priceCeli
    );
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
    if (document.querySelector('.overlay')) {
      document.querySelector('.overlay')?.remove();
    }
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body?.append(overlay);

    swiperWrapper?.addEventListener('click', () => {
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

  private fillPaginationBar = (): void => {
    this.paginationControls.currentPageSpan.innerText =
      this.currentPage.toString();
    if (this.currentPage === 1) {
      this.paginationControls.backButton.classList.add('disabled');
    }
  };

  private setCurrentPage(direction: PaginationDirection): void {
    if (direction === '+') {
      this.currentPage += 1;
      this.fillPaginationBar();
    } else {
      this.currentPage -= 1;
      this.fillPaginationBar();
    }
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
