/* eslint-disable no-param-reassign */
import Router from "../../router/router";

export default class TemplateLayout {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement("div");
    const mainLink = document.createElement("a");
    const logInLink = document.createElement("a");
    const descriptions = ["MAIN", "LOG IN"];
    const hrefs = ["#main", "#login"];
    [mainLink, logInLink].forEach((button, i) => {
      button.href = hrefs[i];
      button.innerText = descriptions[i];
      this.container.append(button);
    });
  }

  public render(): HTMLElement {
    return this.container;
  }
}
