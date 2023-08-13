import Router from "../../router/router";

export default class TemplateLayout {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement("div");
    Router.pages.forEach((route) => {
      const button = document.createElement("button");
      button.innerText = route.description;
      button.addEventListener("click", () => {
        Router.push(route.route);
      });
      this.container.append(button);
    });
  }

  public render(): HTMLElement {
    return this.container;
  }
}
