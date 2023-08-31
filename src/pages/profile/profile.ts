/* eslint-disable max-lines-per-function */
import { Customer } from '@commercetools/platform-sdk';
import { EditCustomerById, QueryCustomerById } from '../../api/apiMethods';
import Component from '../../components/abstract/component';
import Address from './address';
import PersonalInfo from './personalInfo';

const MODAL_INFO = `
  <h2>Edit Profile</h2>
  <label for="input-first-name">First Name:</label>
  <input type="text" id="input-first-name">
  <label for="input-last-name">Last Name:</label>
  <input type="text" id="input-last-name">
  <label for="input-dob">Date of Birth:</label>
  <input type="text" id="input-dob">
  <label for="input-email">Email:</label>
  <input type="text" id="input-email">
  <button id="save-btn">Save</button>
  <button id="cancel-btn">Cancel</button>
  `;

export default class ProfileView extends Component {
  private errorModal: HTMLDialogElement;
  private editInfoModal: HTMLDialogElement;

  private editModal: HTMLDialogElement;
  private inputFirstName: HTMLInputElement;
  private inputLastName: HTMLInputElement;
  private inputDOB: HTMLInputElement;
  private inputEmail: HTMLInputElement;

  constructor() {
    super();
    this.container.classList.add('profile');
    this.errorModal = document.createElement('dialog');
    this.renderHeading();
    this.container.append(this.errorModal);
    this.errorModal.addEventListener('click', () => {
      this.errorModal.close();
    });
    this.refreshProfile();
    this.editInfoModal = document.createElement('dialog');
    this.container.append(this.editInfoModal);

    this.editModal = document.createElement('dialog');
    this.editModal.innerHTML = MODAL_INFO;
    this.container.append(this.editModal);

    this.inputFirstName = this.editModal.querySelector(
      '#input-first-name'
    ) as HTMLInputElement;
    this.inputLastName = this.editModal.querySelector(
      '#input-last-name'
    ) as HTMLInputElement;
    this.inputDOB = this.editModal.querySelector(
      '#input-dob'
    ) as HTMLInputElement;
    this.inputEmail = this.editModal.querySelector(
      '#input-email'
    ) as HTMLInputElement;
    const saveBtn = this.editModal.querySelector('#save-btn');
    const cancelBtn = this.editModal.querySelector('#cancel-btn');

    saveBtn?.addEventListener('click', () => {
      if (this.customerId) {
        this.getCurrentVersion(this.customerId)
          .then((version) => {
            this.editProfile(
              this.inputFirstName.value,
              this.inputLastName.value,
              this.inputDOB.value,
              this.inputEmail.value,
              version
            );
          })
          .catch((error) => {
            console.error('Error getting current version:', error);
          });
      }
      this.editModal.close();
    });

    cancelBtn?.addEventListener('click', () => {
      this.editModal.close();
    });
  }

  private customerId: string | null = localStorage.getItem('customerID');

  public openEditModal(content: Customer): void {
    this.inputFirstName.value = content.firstName || '';
    this.inputLastName.value = content.lastName || '';
    this.inputDOB.value = content.dateOfBirth || '';
    this.inputEmail.value = content.email || '';

    this.editModal.showModal();
  }

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
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      event.stopImmediatePropagation();
      if (target && target.classList.contains('info-edit-btn')) {
        if (this.customerId) {
          QueryCustomerById(this.customerId)
            .then(({ body }) => {
              this.openEditModal(body);
            })
            .catch((error) => {
              this.errorModal.innerText = error;
              this.errorModal.showModal();
            });
        }
      }
    });
  }

  public refreshProfile(): void {
    if (this.customerId) {
      QueryCustomerById(this.customerId)
        .then(({ body }) => {
          this.renderProfileInfo(body);
          this.renderAddresses(body);
        })
        .catch((error) => {
          this.errorModal.innerText = error;
          this.errorModal.showModal();
        });
    }
  }

  private renderProfileInfo(content: Customer): void {
    const profileInfo = new PersonalInfo(
      content.id,
      content.firstName,
      content.lastName,
      content.dateOfBirth,
      content.email
    ).render();
    this.container.append(profileInfo);
  }

  private renderAddresses(content: Customer): void {
    const addressInfo = document.createElement('div');
    addressInfo.className = 'addresses-container';
    content.addresses.forEach(
      (addressData) =>
        addressData.id &&
        addressInfo.appendChild(
          new Address(
            addressData.id,
            addressData.streetName,
            addressData.streetNumber,
            addressData.city,
            addressData.state,
            addressData.country,
            addressData.postalCode,
            content.defaultShippingAddressId === addressData.id,
            content.defaultBillingAddressId === addressData.id,
            content.shippingAddressIds?.includes(addressData.id) || false,
            content.billingAddressIds?.includes(addressData.id) || false
          ).render()
        )
    );
    this.container.append(addressInfo);
  }

  public getCurrentVersion(CUSTOMER_ID: string): Promise<number> {
    return QueryCustomerById(CUSTOMER_ID)
      .then(({ body }) => {
        console.log(body.version);
        return body.version;
      })
      .catch((error) => {
        this.errorModal.innerText = error;
        this.errorModal.showModal();
      });
  }

  public editProfile(
    FIRST_NAME: string,
    LAST_NAME: string,
    DATE_OF_BIRTH: string,
    EMAIL: string,
    VERSION: number
  ): void {
    if (this.customerId) {
      EditCustomerById(
        this.customerId,
        FIRST_NAME,
        LAST_NAME,
        DATE_OF_BIRTH,
        EMAIL,
        VERSION
      )
        .then(({ body }) => {
          const profileContainer = document.querySelector(
            '.profile-container'
          ) as HTMLElement;
          profileContainer.remove();
          const addressesContainer = document.querySelector(
            '.addresses-container'
          ) as HTMLElement;
          addressesContainer.remove();
          this.refreshProfile();
        })
        .catch((error) => {
          this.errorModal.innerText = error;
          this.errorModal.showModal();
        });
    }
  }

  public render(): HTMLElement {
    return this.container;
  }
}
