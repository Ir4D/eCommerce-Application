/* eslint-disable no-param-reassign */
export default class TemplateLayout {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement("div");
    const mainLink = document.createElement("button");
    const logInLink = document.createElement("button");
    const descriptions = ["MAIN", "LOG IN"];
    [mainLink, logInLink].forEach((button, i) => {
      button.innerText = descriptions[i];
      this.container.append(button);
    });
  }

  public render(): HTMLElement {
    return this.container;
  }
}
