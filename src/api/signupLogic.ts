import { Customer } from "./CustomerControl";

export const signupCreate = (): void => {
  const emailElem = (
    document.querySelector(".form-email_input") as HTMLInputElement
  )?.value;
  const passElem = (
    document.querySelector(".form-psw_input") as HTMLInputElement
  )?.value;
  console.log(emailElem, passElem);
  const customer = new Customer();
  customer.createCustomer(emailElem, passElem);
};
