/* eslint-disable no-alert */
/* eslint-disable max-lines-per-function */
import { Customer } from '../../controllers/CustomerControl';
import { countries } from './countries';

let selectedAlpha2Code = '';

function getAlpha2Code(inputCountry: string): string | undefined {
  const input = inputCountry.trim().toUpperCase();
  const matchingCountry = countries.find((country) => country.name === input);
  if (matchingCountry) {
    selectedAlpha2Code = matchingCountry.alpha2Code;
    return selectedAlpha2Code;
  }
  return '';
}

export const signupCreate = (): void => {
  const email = (document.querySelector('.email') as HTMLInputElement)?.value;
  const password = (document.querySelector('.psw') as HTMLInputElement)?.value;
  const firstName = (document.querySelector('.first-name') as HTMLInputElement)
    ?.value;
  const lastName = (document.querySelector('.last-name') as HTMLInputElement)
    ?.value;
  const dob = (document.querySelector('.dob') as HTMLInputElement)?.value;
  const countryBillInput = (
    document.querySelector('.country_bill') as HTMLInputElement
  )?.value;
  const streetBill = (
    document.querySelector('.street_bill') as HTMLInputElement
  )?.value;
  const postBill = (document.querySelector('.post_bill') as HTMLInputElement)
    ?.value;
  const cityBill = (document.querySelector('.city_bill') as HTMLInputElement)
    ?.value;
  const countryShipInput = (
    document.querySelector('.country_ship') as HTMLInputElement
  )?.value;
  const streeShip = (document.querySelector('.street_ship') as HTMLInputElement)
    ?.value;
  const postShip = (document.querySelector('.post_ship') as HTMLInputElement)
    ?.value;
  const cityShip = (document.querySelector('.city_ship') as HTMLInputElement)
    ?.value;

  const countryBill = getAlpha2Code(countryBillInput);
  const countryShip = getAlpha2Code(countryShipInput);

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

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !dob ||
    !countryBill ||
    !streetBill ||
    !postBill ||
    !cityBill ||
    !countryShip ||
    !streeShip ||
    !postShip ||
    !cityShip
  ) {
    alert('Пожалуйста, заполните все поля');
    return;
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
