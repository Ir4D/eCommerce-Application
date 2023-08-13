import MainHeroView from "./main-hero";
import MainOfferView from "./main-offers";
import MainAboutView from "./main-about";
import MainCatalogView from "./main-catalog";
import SpecialOfferView from "./main-special";

const createCodeTemplate = (): string => {
  const mainHeroView = new MainHeroView().render;
  const mainOfferView = new MainOfferView().render;
  const mainAboutView = new MainAboutView().render;
  const mainCatalogView = new MainCatalogView().render;
  const specialOfferView = new SpecialOfferView().render;

  return `<main>${mainHeroView}${mainOfferView}${mainAboutView}${mainCatalogView}${specialOfferView}</main>`;
};

export default class MainView {
  public get render(): string {
    return createCodeTemplate();
  }
}
