import Router from '../services/router/router';
import MenuView from './menu';

export default class HeaderView {
  private container: HTMLElement;
  private HTML = `${new MenuView().render()}
    <ul class="profile_container profile_container--header list">
      <li class="profile_container-item search-item">
        <a href="" class="profile_container-link link">
          <img src="./images/icons/search-icon.png" alt="search" class="search" width="56" height="56">
        </a>
      </li>
      <li class="profile_container-item hidden">
        <a href="" class="profile_container-link link profile_container-link--cart">
          <img src="./images/icons/cart-icon.png" alt="cart" class="cart" width="56" height="56">
          <span class="cart">Cart (0)</span>
        </a>
      </li>
     
    </ul>`;

  constructor() {
    this.container = document.createElement('header');
    this.container.classList.add('header');
    this.container.innerHTML = this.HTML;
  }

  public render(): HTMLElement {
    return this.container;
  }
}

/*
 <li class="profile_container-item hidden">
        <a href="" class="profile_container-link link">
          <img src="./images/avatar.png" alt="profile" class="profile" width="56" height="56"">
        </a>
      </li>
*/
