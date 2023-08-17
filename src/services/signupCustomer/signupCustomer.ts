/* eslint-disable max-lines-per-function */
import { Customer } from '../../controllers/CustomerControl';

export const signupCreate = (): void => {
  const email = (document.querySelector('.email') as HTMLInputElement)?.value;
  const password = (document.querySelector('.psw') as HTMLInputElement)?.value;
  const firstName = (document.querySelector('.first-name') as HTMLInputElement)
    ?.value;
  const lastName = (document.querySelector('.last-name') as HTMLInputElement)
    ?.value;
  const dob = (document.querySelector('.dob') as HTMLInputElement)?.value;
  const countryBill = (
    document.querySelector('.country_bill') as HTMLInputElement
  )?.value;
  const streetBill = (
    document.querySelector('.street_bill') as HTMLInputElement
  )?.value;
  const postBill = (document.querySelector('.post_bill') as HTMLInputElement)
    ?.value;
  const cityBill = (document.querySelector('.city_bill') as HTMLInputElement)
    ?.value;
  const countryShip = (
    document.querySelector('.country_ship') as HTMLInputElement
  )?.value;
  const streeShip = (document.querySelector('.street_ship') as HTMLInputElement)
    ?.value;
  const postShip = (document.querySelector('.post_ship') as HTMLInputElement)
    ?.value;
  const cityShip = (document.querySelector('.city_ship') as HTMLInputElement)
    ?.value;

  let billingDef;
  const billigCheckbox = document.querySelector(
    '.bill_default'
  ) as HTMLInputElement;

  if (billigCheckbox.checked) {
    billingDef = 0;
  } else {
    billingDef = undefined;
  }

  let shippingDef;
  const shippingCheckbox = document.querySelector(
    '.ship_default'
  ) as HTMLInputElement;

  if (shippingCheckbox.checked) {
    shippingDef = 1;
  } else {
    shippingDef = undefined;
  }

  const customer = new Customer();
  customer.createCustomer(
    email,
    password,
    firstName,
    lastName,
    dob,
    countryBill,
    streetBill,
    postBill,
    cityBill,
    countryShip,
    streeShip,
    postShip,
    cityShip,
    billingDef,
    shippingDef
  );
};
