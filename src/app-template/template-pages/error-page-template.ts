export default class TemplateErrorPage {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement("div");
  }

  public render(): HTMLElement {
    this.container.innerText = "404";
    return this.container;
  }
}
