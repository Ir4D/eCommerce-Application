import HeaderView from '../components/header';
import MainView from '../components/main';

const createCodeTemplate = (): string => {
  const header = new HeaderView().render;
  const main = new MainView().render;
  return `${header}${main}`;
};

export default class MainPage {
  public get render(): string {
    return createCodeTemplate();
  }
}
