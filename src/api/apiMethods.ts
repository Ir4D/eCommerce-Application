/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  createApiBuilderFromCtpClient,
  CustomerUpdate,
  CustomerUpdateAction,
  CustomerChangePassword
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
    return apiRoot.productProjections().get().execute();
  };
  return getProducts();
  // .then(({ body }) => {
  //   console.log(body);
  // })
  // .catch(console.error);
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
}

// Edit customer's info by ID
export function EditCustomerById(
  CUSTOMER_ID: string,
  FISRT_NAME: string,
  LAST_NAME: string,
  DATE_OF_BIRTH: string,
  EMAIL: string,
  VERSION: number
): Promise<ClientResponse> {
  const updateFirstName: CustomerUpdateAction = {
    action: 'setFirstName',
    firstName: FISRT_NAME
  };
  const updateLastName: CustomerUpdateAction = {
    action: 'setLastName',
    lastName: LAST_NAME
  };
  const updateDateOfBirth: CustomerUpdateAction = {
    action: 'setDateOfBirth',
    dateOfBirth: DATE_OF_BIRTH
  };
  const updateEmail: CustomerUpdateAction = {
    action: 'changeEmail',
    email: EMAIL
  };
  const updateData: CustomerUpdate = {
    version: VERSION,
    actions: [updateFirstName, updateLastName, updateDateOfBirth, updateEmail]
  };

  return apiRootProfile
    .customers()
    .withId({ ID: CUSTOMER_ID })
    .post({
      body: updateData
    })
    .execute();
}

// Change password by customer ID and old password
export function ChangePassword(
  CUSTOMER_ID: string,
  PASS_OLD: string,
  PASS_NEW: string,
  VERSION: number
): Promise<ClientResponse> {
  const updateData: CustomerChangePassword = {
    id: CUSTOMER_ID,
    version: VERSION,
    currentPassword: PASS_OLD,
    newPassword: PASS_NEW
  };
  return apiRootProfile
    .customers()
    .password()
    .post({
      body: updateData
    })
    .execute();
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
