export default class TemplateLoginPage {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement("div");
  }

  public render(): HTMLElement {
    this.container.innerText = "LOG IN";
    return this.container;
  }
}
