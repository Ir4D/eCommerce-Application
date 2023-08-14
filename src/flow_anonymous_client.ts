/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { apiData } from "./apiData";
import { ctpClientAnonymous } from "./BuildClients";

const apiRoot = createApiBuilderFromCtpClient(ctpClientAnonymous).withProjectKey({
  projectKey: apiData.PROJECT_KEY
});

export function GetProductsPublished(): void {
  const getProducts = () => {
    return apiRoot.productProjections().get().execute();
  };
  getProducts()
    .then(({ body }) => {
      console.log(body);
    })
    .catch(console.error);
}

export function CreateCustomer(EMAIL: string, PASSWORD: string): void {
  console.log("CreateCustomer function");
  const createCustomer = () => {
    return apiRoot
      .me()
      .signup()
      .post({
        body: {
          email: EMAIL,
          password: PASSWORD
        }
      })
      .execute();
  };
  createCustomer()
    .then(({ body }) => {
      console.log(body.customer.id);
      console.log(body.customer.email);
    })
    .catch(console.error);
}