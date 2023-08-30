export default abstract class AsyncPage {
  protected container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
  }

  protected async render(): Promise<HTMLElement> {
    return this.container;
  }
}
