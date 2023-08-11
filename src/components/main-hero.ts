const createCodeTemplate = (): string => {
  return `<section class="hero hero--main_page">
    <div class="hero-content_wrapper">
      <p class="subtitle subtitle--green">100% Natural Food</p>
      <h1 class="hero-title">Choose the best healthier way of&nbsp;life</h1>
      <button class="hero-btn btn btn--yellow">Explore Now</button>
    </div>
  </section>`;
};

export default class MainHeroView {
  public get render(): string {
    return createCodeTemplate();
  }
}
