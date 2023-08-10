/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GetProjectInfo,
  CreateCustomer,
  QueryCustomerById,
  QueryCustomerByEmail
} from "./apiMethods";

export default function App(): void {
  GetProjectInfo();
  QueryCustomerByEmail();
  QueryCustomerById();
}
