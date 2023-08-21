export default class CartView {
  private container = document.createElement('div');
  public get render(): string {
    return `<main>Your cart</main>`;
  }
}
