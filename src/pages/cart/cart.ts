/* eslint-disable max-lines-per-function */
import { Cart, LineItem } from '@commercetools/platform-sdk';
import Component from '../../components/abstract/component';
import State from '../../services/state';
import { GetCartByID, UpdateCartProdQuantity } from '../../api/apiMethods';

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
    const index = 0;
    prodQuantMinus.addEventListener(
      'click',
      this.minusProductInCart.bind(this, index)
    );

    prodQuantPlus.addEventListener(
      'click',
      this.plusProductInCart.bind(this, index)
    );

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

  public async getCurrentCartVersion(CART_ID: string): Promise<Cart> {
    try {
      const response = await GetCartByID(CART_ID);
      const { body } = response;
      return body;
    } catch (error) {
      console.error('Something went wrong:', error);
      throw error;
    }
  }

  private async minusProductInCart(index: number): Promise<void> {
    const LINE_ITEM_ID = State.cart?.body.lineItems[index].id;
    const CART_ID = localStorage.getItem('cartID');
    if (CART_ID && LINE_ITEM_ID) {
      try {
        const CART_INFO = await this.getCurrentCartVersion(CART_ID);
        const QUANTITY = CART_INFO.lineItems[index].quantity - 1;
        const VERSION = CART_INFO.version;
        UpdateCartProdQuantity(CART_ID, VERSION, LINE_ITEM_ID, QUANTITY);
      } catch (error) {
        console.error('Error getting cart version:', error);
      }
    }
  }

  private async plusProductInCart(index: number): Promise<void> {
    const LINE_ITEM_ID = State.cart?.body.lineItems[index].id;
    const CART_ID = localStorage.getItem('cartID');
    if (CART_ID && LINE_ITEM_ID) {
      try {
        const CART_INFO = await this.getCurrentCartVersion(CART_ID);
        const QUANTITY = CART_INFO.lineItems[index].quantity + 1;
        const VERSION = CART_INFO.version;
        UpdateCartProdQuantity(CART_ID, VERSION, LINE_ITEM_ID, QUANTITY);
      } catch (error) {
        console.error('Error getting cart version:', error);
      }
    }
  }

  private renderCartTotal(): void {
    const totalContainer = createElem('cart-total-container');
    totalContainer.innerHTML = '123';
    this.container.append(totalContainer);
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';
    this.renderCart();
    this.renderCartTotal();
    return this.container;
  }
}
