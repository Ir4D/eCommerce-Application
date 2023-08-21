import { offers } from '../utils';
import GoodCartView from './good-cart';
import Router from '../services/router/router';

const createCodeTemplate = (): string => {
  const offersItems: object[] = offers;

  return `
  <section class="special_offer special_offer--main_page">
    <div class="special_offer-wrapper">
      <div class="special_offer-top">
        <div>
          <p class="subtitle subtitle--green">For You</p>
          <h3 class="special_offer-title">Special Offer</h3>
        </div>  
        <a href="${
          Router.pages.catalog
        }" class="btn special_offer-btn link btn--yellow">View All Products</a>
      </div>
      <ul class="special_offer-list list">
        ${offersItems.map((el) => new GoodCartView(el).render).join('')} 
      </ul>
    </div>
  </section>`;
};

export default class SpecialOfferView {
  public get render(): string {
    return createCodeTemplate();
  }
}
