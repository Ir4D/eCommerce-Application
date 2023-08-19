export default class SignUnModal {
  private sucessHTML = `<div>success</div>`;
  private failHTML = `<div>fail</div>`;
  private container = document.querySelector('dialog');

  public show(): void {
    this.container?.showModal();
    document.body.style.overflow = 'hidden';
    this.container?.addEventListener('click', () => {
      this.hide();
    });
  }

  public hide(): void {
    this.container?.close();
    document.body.style.overflow = 'auto';
  }

  public render(success: boolean): string {
    return `<dialog class="sign-in-modal">
                <div>${success ? this.sucessHTML : this.failHTML}</div> 
            </dialog> `;
  }
}
