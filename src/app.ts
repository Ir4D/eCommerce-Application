import MainPage from './pages/main-page';

export default class App {
  public appContainer = document.querySelector<HTMLElement>('body');

  public init(): void {
    if (!this.appContainer) throw new Error('error');
    this.appContainer.innerHTML = new MainPage().render;
  }
}
