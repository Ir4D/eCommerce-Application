/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  createApiBuilderFromCtpClient,
  Project
} from '@commercetools/platform-sdk';
import { apiData } from './apiData';
import { createCtpClient, createCtpClientExistingFlow } from './BuildClients';

const apiRoot = createApiBuilderFromCtpClient(createCtpClient()).withProjectKey(
  {
    projectKey: apiData.PROJECT_KEY
  }
);

const apiRootProfile = createApiBuilderFromCtpClient(
  createCtpClientExistingFlow()
).withProjectKey({
  projectKey: apiData.PROJECT_KEY
});

// Get info about the project - needs Admin Client API with the scope "manage_project:rss-ecom-app"
export function GetProjectInfo(): void {
  const getProject = () => {
    return apiRoot.get().execute();
  };
  getProject()
    .then(({ body }) => {
      console.log(body);
    })
    .catch(console.error);
}

// Get info about published products

export function GetProductsPublished(): Promise<
  ClientResponse<ProductProjectionPagedQueryResponse>
> {
  const getProducts = () => {
    return apiRoot
      .productProjections()
      .get({
        queryArgs: {
          limit: 30
        }
      })
      .execute();
  };
  return getProducts();
  // .then(({ body }) => {
  //   console.log(body);
  // })
  // .catch(console.error);
}

export function getProductCategories() {
  const getCategories = () => {
    return apiRoot.categories().get().execute();
  };
  return getCategories();
}

// Create a new customer
export function CreateCustomer(EMAIL: string, PASSWORD: string): void {
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
      console.log('create customer from methods', body.customer.id);
      console.log('create customer from methods', body.customer.id);
      console.log(body.customer.email);
    })
    .catch(console.error);
}

// Request info about a customer using existing Token Flow
export function QueryCustomer(): Promise<ClientResponse> {
  return apiRootProfile.me().get().execute();
}

// Request info about a customer by its ID
export function QueryCustomerById(
  CUSTOMER_ID: string
): Promise<ClientResponse> {
  return apiRootProfile.customers().withId({ ID: CUSTOMER_ID }).get().execute();
  // const queryCustomer = (customerID: string) => {
  //   return apiRoot.customers().withId({ ID: customerID }).get().execute();
  // };
  // queryCustomer(CUSTOMER_ID)
  //   .then(({ body }) => {
  //     console.log(body.email);
  //   })
  //   .catch(console.error);
}

// Request info about a customer by its EMAIL
export function QueryCustomerByEmail(EMAIL: string): void {
  const returnCustomerByEmail = (customerEmail: string) => {
    return apiRoot
      .customers()
      .get({
        queryArgs: {
          where: `email="${customerEmail}"`
        }
      })
      .execute();
  };
  returnCustomerByEmail(EMAIL)
    .then(({ body }) => {
      if (body.results.length === 0) {
        console.log('This email address has not been registered.');
      } else {
        console.log(body.results[0].id);
      }
    })
    .catch(console.error);
}

// Log in a customer with its email and password
export function AuthenticateCustomer(EMAIL: string, PASSWORD: string): void {
  console.log('AuthoriseCustomer function');
  const authenticateCustomer = () => {
    return apiRoot
      .me()
      .login()
      .post({
        body: {
          email: EMAIL,
          password: PASSWORD
        }
      })
      .execute();
  };
  authenticateCustomer()
    .then(({ body }) => {
      console.log(body.customer.id);
      console.log(body.customer.email);
    })
    .catch(console.error);
}
