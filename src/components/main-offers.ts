const createCodeTemplate = (): string => {
  return `
  <section class="offer offer--main_page">
    <div class="offer-banner offer-banner--first">
      <div class="offer-content_wrapper">
        <p class="subtitle subtitle--white">Natural!!</p>
        <h3 class="offer-title offer-title--white">Get Garden Fresh Fruits</h3>
      </div>
    </div>
    <div class="offer-banner offer-banner--second">
      <div class="offer-content_wrapper">
        <p class="subtitle subtitle--green">Offer!!</p>
        <h3 class="offer-title">Get 10% off on&nbspVegetables</h3>
      </div>
    </div>
  </section>`;
};

export default class MainOfferView {
  public get render(): string {
    return createCodeTemplate();
  }
}
