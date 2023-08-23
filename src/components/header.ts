import MenuView from './menu';
import Router from '../services/router/router';

export default class HeaderView {
  public container: HTMLElement;
  public logoutButton: HTMLElement;
  private HTML = (): string => {
    return `${new MenuView().render()}
    <ul class="profile_container profile_container--header list">
      <li class="profile_container-item search-item">
        <a href="" class="profile_container-link link">
          <img src="./images/icons/search-icon.png" alt="search" class="search" width="56" height="56">
        </a>
      </li>
      <li class="profile_container-item">
        <a href="${
          Router.pages.cart
        }" class="profile_container-link link profile_container-link--cart">
          <img src="./images/icons/cart-icon.png" alt="cart" class="cart" width="56" height="56">
          <span class="cart">Cart (0)</span>
        </a>
      </li>
      <li class="profile_container-item hidden">
      <a href="" class="profile_container-link link">
        <img src="./images/avatar.png" alt="profile" class="profile" width="56" height="56"">
      </a>
    </li>
    </li>
    ${
      localStorage.customerID
        ? `
    <li class="profile_container-item">
        <img src="./images/logout_icon.svg" alt="logout" class="logout" width="50" height="50"">
    </li>
    `
        : ''
    }
    </ul>`;
  };

  constructor() {
    this.container = document.createElement('header');
    this.container.classList.add('header');
    this.container.innerHTML = this.HTML();
    this.logoutButton = this.container.querySelector('.logout') as HTMLElement;
    // console.log('header', this.logoutButton);
    if (this.logoutButton) {
      this.logoutButton.addEventListener('click', () => {
        localStorage.removeItem('customerID');
        this.container.innerHTML = '';
        this.container.innerHTML = this.HTML();
        document
          .querySelector('.profile_container-item.hidden')
          ?.classList.remove('hidden');
      });
    }
  }

  public render(): HTMLElement {
    return this.container;
  }
}
