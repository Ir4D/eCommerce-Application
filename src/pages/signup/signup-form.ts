const formEmailPsw = `
  <div class="form-email-psw">
    <div class="form-email">
      <label class="form-email_label" for="email">E-mail*</label>
      <input class="form-email_input" type="text" id="email" name="email" required></input>
    </div>
    <div class="form-psw">
      <label class="form-psw_label" for="psw">Password*</label>
      <input class="form-psw_input" type="password" id="psw" name="psw" required></input>
    </div>
  </div>
`;

const formNameDob = `
  <div class="form-name-dob">
    <div class="form-name">
      <label class="form-first-name_label" for="first-name">First name*</label>
      <input class="form-first-name_input" type="text" id="first-name" name="first-name" required></input>
      <label class="form-last-name_label" for="last-name">Last name*</label>
      <input class="form-last-name_input" type="text" id="last-name" name="last-name" required></input>
    </div>
    <div class="form-dob">
      <label class="form-dob_label" for="dob">Date of birth*</label>
      <input class="form-dob_input" type="date" id="dob" name="dob" required></input>
    </div>
  </div>
`;

const formBillingAddress = `
  <div class="form-billing-address">
    <h5 class="form-billing_title">Billing Address</h5>
    <label class="form-street_label" for="street">Street*</label>
    <input class="form-street_input" type="text" id="street" name="street" required></input>
    <label class="form-city_label" for="city">City*</label>
    <input class="form-city_input" type="text" id="city" name="city" required></input>
    <label class="form-postalCode_label" for="postalCode">Postal code*</label>
    <input class="form-postalCode_input" type="text" id="postalCode" name="postalCode" required></input>
    <label class="form-country_label for="country"">Country*</label>
    <input class="form-country_input" type="text" id="country" name="country" required></input>
    <div class="form-default_checkbox">
      <input class="form-default_input" type="checkbox" id="setDefaultBilling" name="setDefaultBilling">
      <label class="form-default_label" for="setDefaultBilling">Set deafult</label>
    </div>
  </div>
`;

const formShippinAddress = `
  <div class="form-shipping-address">
    <h5 class="form-shipping_title">Shippin Address</h5>
    <label class="form-street_label" for="street">Street*</label>
    <input class="form-street_input" type="text" id="street" name="street" required></input>
    <label class="form-city_label" for="city">City*</label>
    <input class="form-city_input" type="text" id="city" name="city" required></input>
    <label class="form-postalCode_label" for="postalCode">Postal code*</label>
    <input class="form-postalCode_input" type="text" id="postalCode" name="postalCode" required></input>
    <label class="form-country_label for="country"">Country*</label>
    <input class="form-country_input" type="text" id="country" name="country" required></input>
    <div class="form-default_checkbox">
      <input class="form-default_input" type="checkbox" id="setDefaultShipping" name="setDefaultShipping">
      <label class="form-default_label" for="setDefaultShipping">Set deafult</label>
    </div>
  </div>
`;

const createCodeTemplate = (): string => {
  return `
  <section class="form form-container">
    <div class="form-content_wrapper">
      ${formEmailPsw}
      ${formNameDob}
      <div class="form-addresses">
        ${formBillingAddress}
        ${formShippinAddress}
      </div>
      <button class="form-button btn btn--blue">Sign up</button>
    </div>
  </section>
  `;
};

export default class SignupFormView {
  public get render(): string {
    return createCodeTemplate();
  }
}
