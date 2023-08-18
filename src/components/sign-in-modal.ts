export default class SignInModal {
  private container: HTMLDialogElement;

  constructor() {
    this.container = document.createElement('dialog');
    this.container.classList.add('sign-in-modal');
  }

  public showSignInModal(): void {
    this.container.showModal();
  }

  private fillModal(success: boolean): void {}
}
