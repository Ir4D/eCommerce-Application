/* eslint-disable no-console */
import { ClientResponse, MyCustomerDraft } from '@commercetools/platform-sdk';
import { QueryCustomer } from '../../api/apiMethods';
import Component from '../../components/abstract/component';

export default class ProfileView extends Component {
  private errorModal: HTMLDialogElement;

  constructor() {
    super();
    this.container.classList.add('profile-container');
    this.errorModal = document.createElement('dialog');
    this.refreshProfile();
  }

  public refreshProfile(): void {
    QueryCustomer()
      .then(({ body }) => {
        this.renderProfile(body);
        console.log('refreshProfile:', body.email);
      })
      .catch((error) => {
        this.errorModal.innerText = error;
        this.errorModal.showModal();
      });
  }

  private renderProfile(content: ClientResponse): void {
    console.log('renderProfile:', content.body.results);
    this.container.append(content.body.results);
    // content.body.results.forEach((catalogItem) => {
    //   const catalogItemCard = document.createElement('div');
    //   catalogItemCard.classList.add('catalog-card');
    //   catalogItemCard.innerHTML = `<h2>${catalogItem.name.en}</h2>`;
    //   this.container.append(catalogItemCard);
    // });
  }

  public render(): HTMLElement {
    return this.container;
  }
}
