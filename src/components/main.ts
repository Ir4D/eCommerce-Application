import MainHeroView from './main-hero';
import MainOfferView from './main-offers';
import MainAboutView from './main-about';
import MainCatalogView from './main-catalog';

const createCodeTemplate = (): string => {
  const mainHeroView = new MainHeroView().render;
  const mainOfferView = new MainOfferView().render;
  const mainAboutView = new MainAboutView().render;
  const mainCatalogView = new MainCatalogView().render;

  return `<main>${mainHeroView}${mainOfferView}${mainAboutView}${mainCatalogView}</main>`;
};

export default class MainView {
  public get render(): string {
    return createCodeTemplate();
  }
}
