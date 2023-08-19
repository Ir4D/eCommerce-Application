type ModalStatusType = 'success' | 'user exists' | 'form error';
type ModalArgsType = {
  status: ModalStatusType;
  firstName?: string;
  secondName?: string;
  lastName?: string;
  email?: string;
};

export default class SignUnModal {
  private container = document.querySelector(
    '.sign-in-modal'
  ) as HTMLDialogElement;

  public show({ status, firstName, lastName, email }: ModalArgsType): void {
    this.container.innerHTML = '';
    switch (status) {
      case 'user exists': {
        this.container.classList.add('fail');
        this.container.innerHTML = `
                                    <div class="modal-fail-img"></div>
                                    <h3 class="modal-message">Sorry. User with e-mail ${email} already exists!</h3>
                                    `;
        break;
      }
      case 'form error': {
        this.container.classList.add('fail');
        this.container.innerHTML = `
                                    <div class="modal-fail-img"></div>
                                    <h3 class="modal-message">Sorry. Check if the form is filled out correctly</h3>
                                    `;
        break;
      }

      default: {
        this.container.innerHTML = `
                                  <div class="modal-succes-img"></div>
                                  <h3 class="modal-message">User ${firstName} ${lastName} succesfully registered!</h3>
                                  `;
      }
    }
    this.container?.showModal();
    document.body.style.overflow = 'hidden';
    this.container?.addEventListener('click', () => {
      this.hide();
    });
  }

  public hide(): void {
    this.container.classList.remove('fail');
    this.container?.close();
    document.body.style.overflow = 'auto';
  }

  public render(): string {
    return `<dialog class="sign-in-modal">modalka</dialog> `;
  }
}
