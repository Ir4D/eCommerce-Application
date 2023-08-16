import { Customer } from "./CustomerControl";

export const loginCheck = (): void => {
  const emailElem = (
    document.querySelector(".form-email_input") as HTMLInputElement
  )?.value;
  const passElem = (
    document.querySelector(".form-psw_input") as HTMLInputElement
  )?.value;
  console.log(emailElem, passElem);
  const customer = new Customer();
  customer.loginCustomer(emailElem, passElem);
};
