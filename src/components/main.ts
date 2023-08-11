import MainHeroView from './main-hero';
import MainOfferView from './main-offers';
import MainAboutView from './main-about';

const createCodeTemplate = (): string => {
  const mainHeroView = new MainHeroView().render;
  const mainOfferView = new MainOfferView().render;
  const mainAboutView = new MainAboutView().render;

  return `<main>${mainHeroView}${mainOfferView}${mainAboutView}</main>`;
};

export default class MainView {
  public get render(): string {
    return createCodeTemplate();
  }
}
