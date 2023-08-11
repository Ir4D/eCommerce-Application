import MainHeroView from './main-hero';

const createCodeTemplate = (): string => {
  const mainHeroView = new MainHeroView().render;
  return `<main>${mainHeroView}</main>`;
};

export default class MainView {
  public get render(): string {
    return createCodeTemplate();
  }
}
