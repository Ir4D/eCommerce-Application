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

  private async renderCart(): Promise<void> {
    const productsContainer = createElem('cart-products-container');
    const productsTitle = createElem('cart-products-title');
    productsTitle.innerHTML = `
      <div class="title-column">Image</div>
      <div class="title-column">Name</div>
      <div class="title-column">Item Price</div>
      <div class="title-column">Quantity</div>
      <div class="title-column">Total price</div>
      <div class="title-column title-empty"></div>
    `;
    productsContainer.append(productsTitle);

    const cart = State.cart?.body;
    console.log('cart from cart', cart);
    if (cart && cart.lineItems) {
      cart.lineItems.forEach((productItem) => {
        const cartItem = this.renderCartItem(productItem);
        productsContainer.append(cartItem);
      });
    }
    this.container.append(productsContainer);
  }

  private renderCartItem(product: LineItem): HTMLElement {
    console.log('product', product);
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
      if (product.price.discounted) {
        productPrice.innerHTML = `€ ${String(
          (product.price.discounted.value.centAmount / 100).toFixed(2)
        )}`;
      } else {
        productPrice.innerHTML = `€ ${String(
          (product.price.value.centAmount / 100).toFixed(2)
        )}`;
      }
    }

    const productQuantity = createElem('cart-product-quantity');
    const prodQuantNumber = createElem('prod-quantity_number');
    const prodQuantMinus = createElem('prod-quantity_minus');
    const prodQuantPlus = createElem('prod-quantity_plus');
    if (product.quantity) {
      prodQuantNumber.innerHTML = `${product.quantity}`;
      productQuantity.append(prodQuantMinus, prodQuantNumber, prodQuantPlus);
    }
    const lineItemId = product.id;
    prodQuantMinus.addEventListener(
      'click',
      this.minusProductInCart.bind(this, lineItemId)
    );

    prodQuantPlus.addEventListener(
      'click',
      this.plusProductInCart.bind(this, lineItemId)
    );

    const productTotalPrice = createElem('cart-product-price_total');
    if (product.totalPrice) {
      productTotalPrice.innerHTML = `€ ${String(
        (product.totalPrice.centAmount / 100).toFixed(2)
      )}`;
    }

    const productRemove = createElem('cart-product-remove', 'button');
    productRemove.classList.add('btn', 'btn--blue');
    productRemove.innerHTML = 'Remove';
    productRemove.addEventListener(
      'click',
      this.removeProductFromCart.bind(this, lineItemId)
    );

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

  private async minusProductInCart(LINE_ITEM_ID: string): Promise<void> {
    const CART_ID = localStorage.getItem('cartID');
    if (CART_ID && LINE_ITEM_ID) {
      try {
        const CART_INFO = await this.getCurrentCartVersion(CART_ID);
        const lineItem = CART_INFO.lineItems.find(
          (item) => item.id === LINE_ITEM_ID
        );
        if (lineItem) {
          const QUANTITY = lineItem.quantity - 1;
          const VERSION = CART_INFO.version;
          await UpdateCartProdQuantity(
            CART_ID,
            VERSION,
            LINE_ITEM_ID,
            QUANTITY
          );
        }
        await this.refreshCart();
      } catch (error) {
        console.error('Error getting cart version:', error);
      }
    }
  }

  private async plusProductInCart(LINE_ITEM_ID: string): Promise<void> {
    const CART_ID = localStorage.getItem('cartID');
    if (CART_ID && LINE_ITEM_ID) {
      try {
        const CART_INFO = await this.getCurrentCartVersion(CART_ID);
        const lineItem = CART_INFO.lineItems.find(
          (item) => item.id === LINE_ITEM_ID
        );
        if (lineItem) {
          const QUANTITY = lineItem.quantity + 1;
          const VERSION = CART_INFO.version;
          await UpdateCartProdQuantity(
            CART_ID,
            VERSION,
            LINE_ITEM_ID,
            QUANTITY
          );
        }
        await this.refreshCart();
      } catch (error) {
        console.error('Error getting cart version:', error);
      }
    }
  }

  private async removeProductFromCart(LINE_ITEM_ID: string): Promise<void> {
    const CART_ID = localStorage.getItem('cartID');
    if (CART_ID && LINE_ITEM_ID) {
      try {
        const CART_INFO = await this.getCurrentCartVersion(CART_ID);
        const QUANTITY = 0;
        const VERSION = CART_INFO.version;
        await UpdateCartProdQuantity(CART_ID, VERSION, LINE_ITEM_ID, QUANTITY);
        await this.refreshCart();
      } catch (error) {
        console.error('Error getting cart version:', error);
      }
    }
  }

  private renderCartTotal(): void {
    const cart = State.cart?.body;
    const totalContainer = createElem('cart-total-container');

    const subtotalPrice = createElem('cart-subtotal-price');
    const subtotalTitle = createElem('cart-subtotal-title');
    subtotalTitle.innerHTML = 'Subtotal:';
    const subtotalAmount = createElem('cart-subtotal-amount');
    if (cart && cart.totalPrice) {
      subtotalAmount.innerHTML = `€ ${String(
        (cart.totalPrice.centAmount / 100).toFixed(2)
      )}`;
    }
    subtotalPrice.append(subtotalTitle, subtotalAmount);

    const totalPrice = createElem('cart-total-price');
    const totalTitle = createElem('cart-total-title');
    totalTitle.innerHTML = 'Total:';
    const totalAmount = createElem('cart-total-amount');
    if (cart && cart.totalPrice) {
      totalAmount.innerHTML = `€ ${String(
        (cart.totalPrice.centAmount / 100).toFixed(2)
      )}`;
    }
    totalPrice.append(totalTitle, totalAmount);

    const discountContainer = createElem('cart-discount-container');
    const discountInput = createElem('cart-discount-input', 'input');
    discountInput.setAttribute('type', 'text');
    discountInput.setAttribute('placeholder', 'Promo code');
    const discountBtn = createElem('cart-discount-btn', 'button');
    discountBtn.classList.add('btn', 'btn--yellow');
    discountBtn.innerHTML = 'OK';
    discountContainer.append(discountInput, discountBtn);

    totalContainer.append(subtotalPrice, totalPrice, discountContainer);
    this.container.append(totalContainer);
  }

  private async refreshCart(): Promise<void> {
    await State.refreshCart();
    this.container.innerHTML = '';
    this.renderCart();
    this.renderCartTotal();
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';
    this.renderCart();
    this.renderCartTotal();
    return this.container;
  }
}
