/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  createApiBuilderFromCtpClient,
  CustomerUpdate,
  CustomerUpdateAction,
  CustomerChangePassword,
  CustomerChangeAddressAction,
  CartSetShippingAddressAction,
  CustomerAddShippingAddressIdAction,
  CustomerSetDefaultShippingAddressAction,
  CustomerSetDefaultBillingAddressAction,
  MyCartUpdate,
  Cart
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

// Get cart by ID
export function GetCart(CART_ID: string): Promise<ClientResponse> {
  const getCart = () => {
    return apiRootProfile.me().carts().withId({ ID: CART_ID }).get().execute();
    // activeCart().get().execute();
  };
  return getCart();
}

// Update cart
export function UpdateCart(
  CART_ID: string,
  VERSION: number
): Promise<ClientResponse<Cart>> {
  const data: MyCartUpdate = {
    version: VERSION,
    actions: [
      {
        action: 'addLineItem',
        productId: '5afaa1e1-5929-40c3-ade7-b8fd99cb60cf',
        variantId: 1,
        quantity: 2
      }
    ]
  };
  return apiRootProfile
    .me()
    .carts()
    .withId({ ID: CART_ID })
    .post({
      body: data
    })
    .execute();
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

// Edit customer's address by ID
export function EditAddressById(
  CUSTOMER_ID: string,
  ADDRESS_ID: string,
  STREET_NAME: string,
  CITY: string,
  STATE: string,
  COUNTRY: string,
  POSTAL_CODE: string,
  VERSION: number
): Promise<ClientResponse> {
  const editAdrress: CustomerChangeAddressAction = {
    action: 'changeAddress',
    addressId: ADDRESS_ID,
    address: {
      streetName: STREET_NAME,
      postalCode: POSTAL_CODE,
      city: CITY,
      state: STATE,
      country: COUNTRY
    }
  };

  const updateData: CustomerUpdate = {
    version: VERSION,
    actions: [editAdrress]
  };

  return apiRootProfile
    .customers()
    .withId({ ID: CUSTOMER_ID })
    .post({
      body: updateData
    })
    .execute();
}

// Set deafault shipping address
export function SetDefaultShipAdr(
  CUSTOMER_ID: string,
  ADDRESS_ID: string,
  DEF_SHIPPING: boolean,
  VERSION: number
): Promise<ClientResponse> {
  const isShipDef = DEF_SHIPPING ? ADDRESS_ID : undefined;
  const addShipping: CustomerSetDefaultShippingAddressAction = {
    action: 'setDefaultShippingAddress',
    addressId: isShipDef
  };
  const updateData: CustomerUpdate = {
    version: VERSION,
    actions: [addShipping]
  };
  return apiRootProfile
    .customers()
    .withId({ ID: CUSTOMER_ID })
    .post({
      body: updateData
    })
    .execute();
}

// Set deafault billing address
export function SetDefaultBillAdr(
  CUSTOMER_ID: string,
  ADDRESS_ID: string,
  DEF_BILLING: boolean,
  VERSION: number
): Promise<ClientResponse> {
  const isBillDef = DEF_BILLING ? ADDRESS_ID : undefined;
  const addShipping: CustomerSetDefaultBillingAddressAction = {
    action: 'setDefaultBillingAddress',
    addressId: isBillDef
  };
  const updateData: CustomerUpdate = {
    version: VERSION,
    actions: [addShipping]
  };
  return apiRootProfile
    .customers()
    .withId({ ID: CUSTOMER_ID })
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
