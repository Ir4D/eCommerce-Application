import { formEmailPsw } from '../signup/signup-form';

export default class LoginView {
  public get render(): string {
    return `
    <section class="login">
      <div class="login-wrapper">
        <p class="subtitle subtitle--green login-subtitle">Enter E-mail And Password</p>
        <h3 class="login-title">LogIn</h3>
        <form class="login-form form" id="login">
        ${formEmailPsw}
        </form> 
        <button type="submit" for="login" class="btn login-btn btn--yellow">Let me in</button>
      </div>
    </section>
  `;
  }
}
// <a class="not-found-info-link" href=${Router.pages.main}><div class="btn btn--blue">Go to Homepage</div></a>
