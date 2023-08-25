// export default class AboutView {
//   public get render(): string {
//     return `<main>ABOUT PAGE</main>`;
//   }
// }

/* eslint-disable no-console */
import { Customer } from '@commercetools/platform-sdk';
import { QueryCustomerById } from '../../api/apiMethods';
import Component from '../../components/abstract/component';

export default class AboutView extends Component {
  private errorModal: HTMLDialogElement;

  constructor() {
    super();
    this.container.classList.add('profile-container');
    this.errorModal = document.createElement('dialog');
    this.refreshProfile();
  }

  // private customerId = localStorage.getItem('customerID');
  private customerId: string | null = localStorage.getItem('customerID');

  public refreshProfile(): void {
    if (this.customerId !== null) {
      QueryCustomerById(this.customerId)
        .then(({ body }) => {
          console.log('refreshProfile:', body);
          this.renderProfile(body);
        })
        .catch((error) => {
          this.errorModal.innerText = error;
          // this.errorModal.showModal();
        });
    }
    // QueryCustomerById(this.customerId)
    //   .then(({ body }) => {
    //     console.log('refreshProfile:', body);
    //     this.renderProfile(body);
    //   })
    //   .catch((error) => {
    //     this.errorModal.innerText = error;
    //     // this.errorModal.showModal();
    //   });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderProfile(content: Customer): void {
    const emailItem = document.createElement('div');
    emailItem.classList.add('item-email');
    emailItem.innerHTML = `<p>${content.email}</p>`;
    this.container.append(emailItem);
    const nameItem = document.createElement('div');
    nameItem.classList.add('item-name');
    nameItem.innerHTML = `<p>${content.firstName} ${content.lastName}</p>`;
    this.container.append(nameItem);
  }

  public render(): HTMLElement {
    return this.container;
  }
}
