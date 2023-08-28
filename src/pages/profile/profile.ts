import { Customer } from '@commercetools/platform-sdk';
import { QueryCustomerById } from '../../api/apiMethods';
import Component from '../../components/abstract/component';
import Address from './address';
import PersonalInfo from './personalInfo';

export default class ProfileView extends Component {
  private errorModal: HTMLDialogElement;

  constructor() {
    super();
    this.container.classList.add('profile');
    this.errorModal = document.createElement('dialog');
    this.renderHeading();
    this.refreshProfile();
  }

  private customerId: string | null = localStorage.getItem('customerID');

  public renderHeading(): void {
    const profileWrapper = document.createElement('div');
    profileWrapper.classList.add('profile-title_wrapper');
    const profileBg = document.createElement('div');
    profileBg.classList.add('profile-background-image');
    const profileTitle = document.createElement('h1');
    profileTitle.classList.add('profile-title');
    profileTitle.innerText = 'Your profile';
    profileWrapper.appendChild(profileBg);
    profileBg.appendChild(profileTitle);
    this.container.appendChild(profileWrapper);
  }

  public refreshProfile(): void {
    if (this.customerId) {
      QueryCustomerById(this.customerId)
        .then(({ body }) => {
          this.renderProfile(body);
        })
        .catch((error) => {
          this.errorModal.innerText = error;
          this.errorModal.showModal();
        });
    }
  }

  private renderProfile(content: Customer): void {
    const profileInfo = new PersonalInfo(
      content.id,
      content.firstName,
      content.lastName,
      content.dateOfBirth,
      content.email
    ).render();
    content.addresses.forEach(
      (addressData) =>
        addressData.id &&
        profileInfo.appendChild(
          new Address(
            addressData.id,
            addressData.streetName,
            addressData.streetNumber,
            addressData.city,
            addressData.country,
            addressData.postalCode,
            content.defaultShippingAddressId === addressData.id,
            content.defaultBillingAddressId === addressData.id,
            content.shippingAddressIds?.includes(addressData.id) || false,
            content.billingAddressIds?.includes(addressData.id) || false
          ).render()
        )
    );
    this.container.append(profileInfo);
  }

  public render(): HTMLElement {
    return this.container;
  }
}
