/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ProductProjection } from '@commercetools/platform-sdk';
import State from '../../services/state';

const getCategory = (currentId: string): string => {
  const category = State.categories?.body.results.find(
    (el) => el.id === currentId
  );
  if (!category) throw new Error('error');

  return category.name.en;
};

const getContent = (
  catalogItem: ProductProjection,
  category: string
): string => {
  if (
    !catalogItem.masterVariant.images ||
    !catalogItem.masterVariant.prices ||
    !catalogItem.description
  )
    throw new Error('error');
  // catalogItem.masterVariant.images[0].url
  return `
  <section class="item-content">
    <div class="img-container">
      ${catalogItem.masterVariant.images
        .map(
          (img) =>
            `<img src="${img.url}" class="item-img visually-hidden" width="550" height="550" />`
        )
        .join('')}
    </div>
    <div class="item-description">
      <button class="btn catalog-card_btn item-category">${category}</button>
      <h2 class="item-title">${catalogItem.name.en}</h2>
      <svg class="item-rating" width="85" height="19" viewBox="0 0 85 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.76839 3.09367C9.07599 2.18997 10.3541 2.18998 10.6617 3.09367L11.6452 5.98313C11.7832 6.3884 12.1638 6.66091 12.5919 6.66091H15.6721C16.6521 6.66091 17.0472 7.92416 16.242 8.48263L13.8313 10.1546C13.4644 10.409 13.3106 10.8758 13.4545 11.2985L14.394 14.0586C14.7048 14.9718 13.6701 15.7523 12.8774 15.2025L10.2849 13.4046C9.9422 13.1668 9.48791 13.1668 9.14516 13.4046L6.55269 15.2025C5.76002 15.7523 4.72529 14.9718 5.03613 14.0586L5.97561 11.2985C6.11948 10.8758 5.96572 10.409 5.59884 10.1546L3.1881 8.48263C2.38287 7.92416 2.77805 6.66091 3.758 6.66091H6.83821C7.26631 6.66091 7.64692 6.3884 7.78487 5.98313L8.76839 3.09367Z" fill="#FFA858"/>
        <path d="M24.951 3.23964C25.2504 2.31832 26.5538 2.31832 26.8531 3.23964L27.7402 5.96992C27.8741 6.38194 28.2581 6.66091 28.6913 6.66091H31.562C32.5308 6.66091 32.9335 7.90051 32.1498 8.46992L29.8273 10.1574C29.4768 10.412 29.3302 10.8634 29.464 11.2754L30.3512 14.0058C30.6505 14.9271 29.596 15.6932 28.8123 15.1238L26.4899 13.4364C26.1394 13.1817 25.6648 13.1817 25.3143 13.4364L22.9919 15.1238C22.2081 15.6932 21.1537 14.9271 21.453 14.0058L22.3401 11.2754C22.474 10.8634 22.3273 10.412 21.9769 10.1574L19.6543 8.46991C18.8706 7.90051 19.2734 6.66091 20.2421 6.66091H23.1129C23.5461 6.66091 23.9301 6.38194 24.0639 5.96992L24.951 3.23964Z" fill="#FFA858"/>
        <path d="M41.1424 3.09367C41.45 2.18997 42.7281 2.18998 43.0357 3.09367L44.0193 5.98313C44.1572 6.3884 44.5378 6.66091 44.9659 6.66091H48.0461C49.0261 6.66091 49.4213 7.92416 48.616 8.48263L46.2053 10.1546C45.8384 10.409 45.6847 10.8758 45.8285 11.2985L46.768 14.0586C47.0788 14.9718 46.0441 15.7523 45.2514 15.2025L42.659 13.4046C42.3162 13.1668 41.8619 13.1668 41.5192 13.4046L38.9267 15.2025C38.134 15.7523 37.0993 14.9718 37.4102 14.0586L38.3496 11.2985C38.4935 10.8758 38.3397 10.409 37.9729 10.1546L35.5621 8.48263C34.7569 7.92416 35.1521 6.66091 36.132 6.66091H39.2122C39.6403 6.66091 40.0209 6.3884 40.1589 5.98313L41.1424 3.09367Z" fill="#FFA858"/>
        <path d="M57.325 3.23964C57.6244 2.31832 58.9278 2.31832 59.2272 3.23964L60.1143 5.96992C60.2481 6.38194 60.6321 6.66091 61.0653 6.66091H63.9361C64.9048 6.66091 65.3076 7.90051 64.5239 8.46992L62.2013 10.1574C61.8508 10.412 61.7042 10.8634 61.8381 11.2754L62.7252 14.0058C63.0245 14.9271 61.97 15.6932 61.1863 15.1238L58.8639 13.4364C58.5134 13.1817 58.0388 13.1817 57.6883 13.4364L55.3659 15.1238C54.5822 15.6932 53.5277 14.9271 53.827 14.0058L54.7141 11.2754C54.848 10.8634 54.7014 10.412 54.3509 10.1574L52.0283 8.46991C51.2446 7.90051 51.6474 6.66091 52.6161 6.66091H55.4869C55.9201 6.66091 56.3041 6.38194 56.4379 5.96992L57.325 3.23964Z" fill="#FFA858"/>
        <path d="M73.5164 3.09367C73.824 2.18997 75.1022 2.18998 75.4098 3.09367L76.3933 5.98313C76.5312 6.3884 76.9118 6.66091 77.3399 6.66091H80.4202C81.4001 6.66091 81.7953 7.92416 80.9901 8.48263L78.5793 10.1546C78.2124 10.409 78.0587 10.8758 78.2025 11.2985L79.142 14.0586C79.4529 14.9718 78.4181 15.7523 77.6255 15.2025L75.033 13.4046C74.6902 13.1668 74.236 13.1668 73.8932 13.4046L71.3007 15.2025C70.5081 15.7523 69.4733 14.9718 69.7842 14.0586L70.7237 11.2985C70.8675 10.8758 70.7138 10.409 70.3469 10.1546L67.9362 8.48263C67.1309 7.92416 67.5261 6.66091 68.506 6.66091H71.5863C72.0144 6.66091 72.395 6.3884 72.5329 5.98313L73.5164 3.09367Z" fill="#FFA858"/>
      </svg>
      <span class="catalog-card_price">€${
        catalogItem.masterVariant.prices[0].value.centAmount / 100
      }</span>
        <div class="item-text">
          ${catalogItem.description.en} 
          <br>Simply dummy text of the printing and typesetting industry. Lorem had ceased to been the industry's standard dummy text 
          ever since the 1500s, when an unknown printer took a galley.
        </div>
        <div class="slider_btn-container">
          <button class="slider-btn prev"> &#8592; </button>
          <button class="slider-btn next"> &#8594; </button>
        </div>
        <form class=order-form>
          <span class="order-text">Quantity:</span>
          <input type="text" class="order-quantity" />
          <button type="submit" class="order-submit btn btn--blue">Add To Cart</button>
        </form>
    </div>
  </section>`;
};

const INNER_HTML = {
  hero: `<section class="item-hero"><h1>Shop Single</h1></section>`
};

export default class ItemView extends State {
  private container: HTMLElement;
  private activeSlideNumber: number;
  private catalogItem: ProductProjection;
  private next: HTMLElement;

  constructor(catalogItem: ProductProjection) {
    super();
    this.container = document.createElement('section');
    this.container.classList.add('good-cart');
    this.container.innerHTML = `${INNER_HTML.hero}`;
    this.activeSlideNumber = 0;
    this.catalogItem = catalogItem;
    this.next = this.container.querySelector('.next') as HTMLElement;
  }

  public async render(): Promise<HTMLElement> {
    const category: string = getCategory(this.catalogItem.categories[0].id);
    this.container.innerHTML += getContent(this.catalogItem, category);

    return this.container;
  }
}
