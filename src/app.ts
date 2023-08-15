import Layout from './pages/layout';

export default class App {
  public appContainer = document.querySelector<HTMLElement>('body');

  public init(): void {
    if (!this.appContainer) throw new Error('error');
    new Layout().render(this.appContainer);
  }
}
