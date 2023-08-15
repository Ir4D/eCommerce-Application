import HeaderView from '../components/header';
import MainView from '../components/main';
import FooterView from '../components/footer';

const createCodeTemplate = (): string => {
  const header = new HeaderView().render;
  const main = new MainView().render;
  const footer = new FooterView().render;

  return `${header}${main}${footer}`;
};

export default class MainPage {
  public get render(): string {
    return createCodeTemplate();
  }
}
