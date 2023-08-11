import MainHeroView from './main-hero';
import MainOfferView from './main-offers';

const createCodeTemplate = (): string => {
  const mainHeroView = new MainHeroView().render;
  const mainOfferView = new MainOfferView().render;
  return `<main>${mainHeroView}${mainOfferView}</main>`;
};

export default class MainView {
  public get render(): string {
    return createCodeTemplate();
  }
}
