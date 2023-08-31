/* eslint-disable max-lines-per-function */
/* eslint-disable no-restricted-syntax */
import InfoElem from './profileElem';

const createElem = (tag: string, className: string): HTMLElement =>
  Object.assign(document.createElement(tag), { className });

export default class Address {
  public id: string;
  public streetName: string | undefined;
  public streetNumber: string | undefined;
  public city: string | undefined;
  public state: string | undefined;
  public country: string | undefined;
  public postalCode: string | undefined;
  public isDefaultShipping: boolean;
  public isDefaultBilling: boolean;
  public isShippingAddress: boolean;
  public isBillingAddress: boolean;
  private container: HTMLElement;

  constructor(
    id: string,
    streetName: string | undefined,
    streetNumber: string | undefined,
    city: string | undefined,
    state: string | undefined,
    country: string | undefined,
    postalCode: string | undefined,
    isDefaultShipping: boolean,
    isDefaultBilling: boolean,
    isShippingAddress: boolean,
    isBillingAddress: boolean
  ) {
    this.id = id;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.city = city;
    this.state = state;
    this.country = country;
    this.postalCode = postalCode;
    this.isDefaultShipping = isDefaultShipping;
    this.isDefaultBilling = isDefaultBilling;
    this.isShippingAddress = isShippingAddress;
    this.isBillingAddress = isBillingAddress;
    this.container = document.createElement('div');
    this.container.className = 'profile-address';
    this.createAddressElem();
  }

  public createAddressElem(): void {
    const addressItem = createElem('div', 'address-item');
    const adrTitle = createElem('div', 'address-title');
    if (this.isBillingAddress) {
      adrTitle.classList.add('adr-billing');
    }
    if (this.isShippingAddress) {
      adrTitle.classList.add('adr-shipping');
    }
    if (this.isDefaultBilling) {
      adrTitle.classList.add('adr-billing_deafult');
    }
    if (this.isDefaultShipping) {
      adrTitle.classList.add('adr-shipping_deafult');
    }
    adrTitle.innerHTML = 'Address:';
    const adrStreet = new InfoElem(
      'address-street',
      'Street:',
      `${this.streetName} ${this.streetNumber ? this.streetNumber : ''}`
    ).render();
    const adrCity = new InfoElem(
      'address-city',
      'City:',
      `${this.city}`
    ).render();
    const adrState = new InfoElem(
      'address-state',
      'State:',
      `${this.state ? this.state : '-'}`
    ).render();
    const adrCountry = new InfoElem(
      'address-country',
      'Country:',
      `${this.country}`
    ).render();
    const adrPostalCode = new InfoElem(
      'address-post',
      'Postal Code:',
      `${this.postalCode}`
    ).render();
    const { classList } = adrTitle;
    for (const className of classList) {
      if (className.startsWith('adr-')) {
        const label = document.createElement('div');
        label.textContent = className.replace('adr-', '').replace('_', ' ');
        adrTitle.appendChild(label);
      }
    }
    const editBtns = createElem('div', 'edit-btns');
    const editBtn = createElem('button', 'edit-btn');
    editBtn.classList.add('btn', 'btn--blue');
    editBtn.innerHTML = 'Edit';
    const deleteBtn = createElem('button', 'delete-btn');
    deleteBtn.classList.add('btn', 'btn--blue');
    deleteBtn.innerHTML = 'Delete';
    editBtns.append(editBtn, deleteBtn);
    addressItem.append(
      adrTitle,
      adrStreet,
      adrCity,
      adrState,
      adrCountry,
      adrPostalCode,
      editBtns
    );
    this.container.append(addressItem);
  }

  public render(): HTMLElement {
    return this.container;
  }
}
