import MenuView from './menu';
import Router from '../services/router/router';
import State from '../services/state';

const INNER_HTML = {
  // searchItem: `<li class="profile_container-item search-item">
  //     <a href="" class="profile_container-link link">
  //       <img src="./images/icons/search-icon.png" alt="search" class="search" width="56" height="56">
  //     </a>
  //   </li>
  //   `,
  cartItem: `<li class="profile_container-item cart-item">
      <a href="${Router.pages.cart}" class="profile_container-link link profile_container-link--cart">
        <img src="./images/icons/cart-icon.png" alt="cart" class="cart cart-icon" width="56" height="56">
        <span class="cart cart-indicator">0</span>
      </a>
    </li>
    `,
  loggedItem: `<a href="#profile" class="profile_container-link link">
      <img src="./images/avatar.png" alt="profile" class="profile" width="56" height="56"">
    </a>
    <a href="" class="profile_container-logout link">
      <img src="./images/logout_icon.svg" alt="logout" class="logout" width="56" height="56"">
    </a>
    `
};

export default class HeaderView {
  public container: HTMLElement;
  public logoutButton: HTMLElement;
  private menu: MenuView;

  constructor() {
    this.container = document.createElement('header');
    this.container.classList.add('header');
    this.menu = new MenuView();
    this.renderHeader();
    this.logoutButton = this.container.querySelector('.logout') as HTMLElement;
    if (this.logoutButton) {
      this.logoutButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        if (target.classList.contains('logout')) {
          localStorage.removeItem('customerID');
          localStorage.removeItem('access_token');
          localStorage.removeItem('cartID');
          this.container.innerHTML = '';
          this.container.append(this.menu.render());
          document.querySelector('.logged-item')?.classList.add('hidden');
          document.querySelector('.nav-item_login')?.classList.remove('hidden');
          document
            .querySelector('.nav-item_signup')
            ?.classList.remove('hidden');
        }
      });
    }
  }

  private customerId: string | null = localStorage.getItem('customerID');

  private renderHeader(): void {
    this.container.append(this.menu.render());
    this.container.append(this.headerList());
    window.addEventListener('cart-change', () => {
      console.log('listener', State.cart);
      this.refreshCartCounter(
        State.cart?.body.lineItems.length
          ? State.cart?.body.lineItems.length
          : 0
      );
    });
  }

  public headerList(): HTMLElement {
    const profileContainer = document.createElement('ul');
    profileContainer.classList.add(
      'profile_container',
      'profile_container--header',
      'list'
    );
    const loggedItemList = document.createElement('li');
    loggedItemList.classList.add('profile_container-item', 'logged-item');
    loggedItemList.innerHTML = `${INNER_HTML.loggedItem}`;
    profileContainer.innerHTML = `${INNER_HTML.cartItem}`;
    if (!this.customerId) {
      loggedItemList.classList.add('hidden');
    } else {
      loggedItemList.classList.remove('hidden');
    }
    profileContainer.append(loggedItemList);
    return profileContainer;
  }

  public refreshCartCounter(itemsQuantity: number): void {
    const counter = document.querySelector('.cart-indicator') as HTMLElement;
    counter.innerText = itemsQuantity.toString();
    console.log('rerender', State.cart?.body.lineItems);
  }

  public render(): HTMLElement {
    return this.container;
  }
}
