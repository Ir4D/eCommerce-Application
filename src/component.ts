/* eslint-disable @typescript-eslint/explicit-function-return-type */
abstract class Component {
  protected container: HTMLElement;

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  public render() {
    return this.container;
  }
}

export default Component;
