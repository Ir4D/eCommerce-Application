/* eslint-disable max-lines-per-function */
import { LineItem } from '@commercetools/platform-sdk';
import Component from '../../components/abstract/component';
import State from '../../services/state';

export default class CartView extends Component {
  constructor() {
    super();
    this.container.className = 'cart-container';
  }

  private renderCart(): void {
    const productsContainer = document.createElement('div');
    productsContainer.classList.add('cart-products-container');

    const productsTitle = document.createElement('div');
    productsTitle.classList.add('cart-products-title');
    productsTitle.innerHTML = `
      <div>Image</div>
      <div>Name</div>
      <div>Price</div>
      <div>Quantity</div>
      <div>Total price</div>
    `;
    productsContainer.append(productsTitle);

    const cart = State.cart?.body;
    if (cart && cart.lineItems) {
      cart.lineItems.forEach((productItem) => {
        const cartItem = this.renderCartItem(productItem);
        productsContainer.append(cartItem);
      });
    }
    this.container.append(productsContainer);
  }

  private renderCartItem(product: LineItem): HTMLElement {
    console.log(product);
    const productElem = document.createElement('div');
    productElem.classList.add('cart-product-item');

    const productImage = document.createElement('div');
    productImage.classList.add('cart-product-image');
    if (product.variant.images) {
      productImage.style.background = `center / contain no-repeat url('${product.variant.images[0].url}') #ffff`;
    }

    const productName = document.createElement('div');
    if (product.productId) {
      productName.innerHTML = product.name.en;
    }

    const productPrice = document.createElement('div');
    if (product.price) {
      productPrice.innerHTML = `${product.price.value.currencyCode} ${String(
        (product.price.value.centAmount / 100).toFixed(2)
      )}`;
    }

    const productQuantity = document.createElement('div');
    if (product.quantity) {
      productQuantity.innerHTML = `${product.quantity}`;
    }

    const productTotalPrice = document.createElement('div');
    if (product.totalPrice) {
      productTotalPrice.innerHTML = `${
        product.totalPrice.currencyCode
      } ${String((product.totalPrice.centAmount / 100).toFixed(2))}`;
    }

    productElem.append(
      productImage,
      productName,
      productPrice,
      productQuantity,
      productTotalPrice
    );

    return productElem;
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';
    this.renderCart();
    return this.container;
  }
}
