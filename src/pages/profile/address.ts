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
  }

  public getFormattedAddress(): string {
    return `${this.streetNumber} ${this.streetName}, ${this.city}, ${this.country}`;
  }
}
