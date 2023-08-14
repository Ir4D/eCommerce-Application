/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { apiData } from "./apiData";
import { ctpClientCredentials } from "./BuildClients";

const apiRoot = createApiBuilderFromCtpClient(ctpClientCredentials).withProjectKey({
  projectKey: apiData.PROJECT_KEY
});

// const CUSTOMER_ID = "44f2a088-e8a6-4eff-ba97-c0b2bcb4bc06";

export function GetProjectInfo(): void {
  const getProject = () => {
    return apiRoot.get().execute();
  };
  // getProject().then(console.log).catch(console.error);
  getProject()
    .then(({ body }) => {
      console.log(body);
    })
    .catch(console.error);
}

// export function GetProductsPublished(): void {
//   const getProducts = () => {
//     // return apiRoot.products().get().execute();
//     return apiRoot.productProjections().get().execute();
//   };
//   // getProject().then(console.log).catch(console.error);
//   getProducts()
//     .then(({ body }) => {
//       console.log(body);
//     })
//     .catch(console.error);
// }

// export function CreateCustomer(): void {
//   const createCustomer = () => {
//     return apiRoot
//       .customers()
//       .post({
//         body: {
//           email: EMAIL,
//           password: PASSWORD
//         }
//       })
//       .execute();
//   };
//   createCustomer()
//     .then(({ body }) => {
//       console.log(body.customer.id);
//       console.log(body.customer.email);
//     })
//     .catch(console.error);
// }

// export function QueryCustomerById(): void {
//   const queryCustomer = (customerID: string) => {
//     return apiRoot.customers().withId({ ID: customerID }).get().execute();
//   };
//   queryCustomer(CUSTOMER_ID)
//     .then(({ body }) => {
//       console.log(body.email);
//     })
//     .catch(console.error);
// }

// export function QueryCustomerByEmail(): void {
//   const returnCustomerByEmail = (customerEmail: string) => {
//     return apiRoot
//       .customers()
//       .get({
//         queryArgs: {
//           where: `email="${customerEmail}"`
//         }
//       })
//       .execute();
//   };
//   returnCustomerByEmail(EMAIL)
//     .then(({ body }) => {
//       if (body.results.length === 0) {
//         console.log("This email address has not been registered.");
//       } else {
//         console.log(body.results[0].id);
//       }
//     })
//     .catch(console.error);
// }

// export function LoginCustomer(): void {
//   const createCustomer = () => {
//     return apiRoot
//       .login()
//       .post({
//         body: {
//           email: EMAIL,
//           password: PASSWORD
//         }
//       })
//       .execute();
//   };
//   createCustomer()
//     .then(({ body }) => {
//       console.log(body.customer.id);
//       console.log(body.customer.email);
//     })
//     .catch(console.error);
// }
