/* eslint-disable max-lines-per-function */
import { LineItem } from '@commercetools/platform-sdk';
import Component from '../../components/abstract/component';
import State from '../../services/state';

const createElem = (className: string, tag = 'div'): HTMLElement =>
  Object.assign(document.createElement(tag), { className });

export default class CartView extends Component {
  constructor() {
    super();
    this.container.className = 'cart-container';
  }

  private renderCart(): void {
    const productsContainer = createElem('cart-products-container');
    const productsTitle = createElem('cart-products-title');
    productsTitle.innerHTML = `
      <div class="title-column">Image</div>
      <div class="title-column">Name</div>
      <div class="title-column">Price</div>
      <div class="title-column">Quantity</div>
      <div class="title-column">Total price</div>
      <div class="title-column title-empty"></div>
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
    const productElem = createElem('cart-product-item');
    const productImage = createElem('cart-product-image');
    if (product.variant.images) {
      productImage.style.background = `center / contain no-repeat url('${product.variant.images[0].url}') #ffff`;
    }

    const productName = createElem('cart-product-name');
    if (product.productId) {
      productName.innerHTML = product.name.en;
    }

    const productPrice = createElem('cart-product-price');
    if (product.price) {
      productPrice.innerHTML = `${product.price.value.currencyCode} ${String(
        (product.price.value.centAmount / 100).toFixed(2)
      )}`;
    }

    const productQuantity = createElem('cart-product-quantity');
    const prodQuantNumber = createElem('prod-quantity_number');
    const prodQuantMinus = createElem('prod-quantity_minus');
    const prodQuantPlus = createElem('prod-quantity_plus');
    if (product.quantity) {
      prodQuantNumber.innerHTML = `${product.quantity}`;
      productQuantity.append(prodQuantMinus, prodQuantNumber, prodQuantPlus);
    }

    const productTotalPrice = createElem('cart-product-price_total');
    if (product.totalPrice) {
      productTotalPrice.innerHTML = `${
        product.totalPrice.currencyCode
      } ${String((product.totalPrice.centAmount / 100).toFixed(2))}`;
    }

    const productRemove = createElem('cart-product-remove', 'button');
    productRemove.classList.add('btn', 'btn--blue');
    productRemove.innerHTML = 'Remove';

    productElem.append(
      productImage,
      productName,
      productPrice,
      productQuantity,
      productTotalPrice,
      productRemove
    );

    return productElem;
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';
    this.renderCart();
    return this.container;
  }
}
