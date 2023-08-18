import Router from '../services/router/router';

const createCodeTemplate = (): string => {
  return ` 
    <nav>
      <button class="nav-mobile"><span></span><span></span></button>
      <ul class="nav nav--header list ">
        <li class="nav-item header-logo logo">
          <img src="./images/Logo.png" alt="logo" class="logo-img" width="37" height="54"
            />
            <h4 class="logo-text">Organick</h4>
        </li>
        <li class="nav-item">
          <a href="" class="nav-link"></a>
        </li>
        <li class="nav-item"><a href=${Router.pages.main} class="nav-link link">Home</a></li>
        <li class="nav-item"><a href=${Router.pages.about} class="nav-link link">About</a></li>
        <li class="nav-item"><a href=${Router.pages.catalog} class="nav-link link">Catalog</a></li>
        <li class="nav-item"><a href=${Router.pages.login} class="nav-link link">Log in</a></li>
        <li class="nav-item"><a href=${Router.pages.signup} class="nav-link link">Sign up</a></li>
      </ul>
    </nav>`;
};

export default class MenuView {
  public render(): string {
    return createCodeTemplate();
  }
}
