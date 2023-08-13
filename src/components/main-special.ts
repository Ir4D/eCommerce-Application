import { offers } from "../utils";
import GoodCartView from "./good-cart";

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
        <button class="special_offer-btn btn btn--yellow">View All Products</button>
      </div>
      <ul class="special_offer-list list">
        ${offersItems.map((el) => new GoodCartView(el).render).join("")} 
      </ul>
    </div>
  </section>`;
};

export default class SpecialOfferView {
  public get render(): string {
    return createCodeTemplate();
  }
}
