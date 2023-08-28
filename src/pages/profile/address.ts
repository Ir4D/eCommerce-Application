const createDivElem = (className: string): HTMLElement =>
  Object.assign(document.createElement('div'), { className });

export default class Address {
  public id: string;
  public streetName: string | undefined;
  public streetNumber: string | undefined;
  public city: string | undefined;
  public country: string | undefined;
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
    country: string | undefined,
    isDefaultShipping: boolean,
    isDefaultBilling: boolean,
    isShippingAddress: boolean,
    isBillingAddress: boolean
  ) {
    this.id = id;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.city = city;
    this.country = country;
    this.isDefaultShipping = isDefaultShipping;
    this.isDefaultBilling = isDefaultBilling;
    this.isShippingAddress = isShippingAddress;
    this.isBillingAddress = isBillingAddress;
    this.container = document.createElement('div');
    this.container.className = 'profile-address';
    this.createAddressElem();
  }

  public createAddressElem(): void {
    const addressItem = createDivElem('address-item');
    addressItem.innerHTML = `
      <div class="address-title">${
        this.isBillingAddress ? 'Billing Address' : ''
      } ${this.isDefaultBilling ? '/ Default Billing Address' : ''}</div>
      <div class="address-title">${
        this.isShippingAddress ? 'Shipping Address' : ''
      } ${this.isDefaultShipping ? '/ Default Shipping Address' : ''}</div>
      <div class="address-street">Street: ${
        this.streetNumber ? this.streetNumber : ''
      } ${this.streetName}</div>
      <div class="address-city">City: ${this.city}</div>
      <div class="address-country">Country: ${this.country}</div>
    `;
    this.container.append(addressItem);
  }

  public render(): HTMLElement {
    return this.container;
  }
}
