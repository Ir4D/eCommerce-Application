import { Customer } from '@commercetools/platform-sdk';
import { QueryCustomerById } from '../../api/apiMethods';
import Component from '../../components/abstract/component';
import Address from './address';
import PersonalInfo from './personalInfo';

export default class ProfileView extends Component {
  private errorModal: HTMLDialogElement;

  constructor() {
    super();
    this.container.classList.add('profile-container');
    this.errorModal = document.createElement('dialog');
    this.refreshProfile();
  }

  private customerId: string | null = localStorage.getItem('customerID');

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
    const createDivWithClass = (className: string): HTMLDivElement =>
      Object.assign(document.createElement('div'), { className });
    const createAddressDiv = (address: Address): HTMLDivElement =>
      Object.assign(document.createElement('div'), {
        innerHTML: `<p>Address: ${address.getFormattedAddress()}${
          address.isDefaultShipping ? ' / Default Shipping Address' : ''
        }${address.isDefaultBilling ? ' / Default Billing Address' : ''}${
          address.isShippingAddress ? ' / Shipping Address' : ''
        }${address.isBillingAddress ? ' / Billing Address' : ''}</p>`
      });
    const profileInfo = createDivWithClass('personal-info');
    profileInfo.innerHTML = `<div>${new PersonalInfo(
      content.id,
      content.firstName,
      content.lastName,
      content.dateOfBirth,
      content.email
    ).getFormattedPersonalInfo()}</div>`;
    content.addresses.forEach(
      (addressData) =>
        addressData.id &&
        profileInfo.appendChild(
          createAddressDiv(
            new Address(
              addressData.id,
              addressData.streetName,
              addressData.streetNumber,
              addressData.city,
              addressData.country,
              content.defaultShippingAddressId === addressData.id,
              content.defaultBillingAddressId === addressData.id,
              content.shippingAddressIds?.includes(addressData.id) || false,
              content.billingAddressIds?.includes(addressData.id) || false
            )
          )
        )
    );
    this.container.append(profileInfo);
  }

  public render(): HTMLElement {
    return this.container;
  }
}
