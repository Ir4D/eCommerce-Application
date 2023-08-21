import { goods } from '../utils';
import Router from '../services/router/router';
import GoodCartView from './good-cart';

const createCodeTemplate = (): string => {
  const goodItems: object[] = goods;

  return `
  <section class="catalog catalog--main_page">
    <p class="subtitle subtitle--green">Catalog</p>
    <h2 class="catalof-titile">Our Products</h2>
    <ul class="catalog-list list">
      ${goodItems.map((el) => new GoodCartView(el).render).join('')} 
    </ul>
    <a href="${
      Router.pages.catalog
    }" class="catalog-btn btn btn--blue link">Load More</a>
  </section>`;
};

export default class MainCatalogView {
  public get render(): string {
    return createCodeTemplate();
  }
}
