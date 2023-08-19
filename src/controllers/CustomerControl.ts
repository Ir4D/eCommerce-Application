/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { apiData } from '../api/apiData';
import {
  createCtpClientWithCredentials,
  createCtpClientWithScopes
} from '../api/BuildClients';

import SignUnModal from '../pages/signup/sign-up-modal';

export class Customer {
  private signupModal = new SignUnModal();
  public async createCustomer(
    EMAIL: string,
    PASSWORD: string,
    FIRST_NAME: string,
    LAST_NAME: string,
    DOB: string,
    COUNTRY_BILL: string,
    STREET_BILL: string,
    POST_BILL: string,
    CITY_BILL: string,
    COUNTRY_SHIP: string,
    STREET_SHIP: string,
    POST_SHIP: string,
    CITY_SHIP: string,
    BILLING_DEF: number | undefined,
    SHIPPING_DEF: number | undefined
  ): Promise<void> {
    const apiRoot = createApiBuilderFromCtpClient(
      createCtpClientWithScopes()
    ).withProjectKey({
      projectKey: apiData.PROJECT_KEY
    });

    const createCustomer = () => {
      return apiRoot
        .customers()
        .post({
          body: {
            email: EMAIL,
            password: PASSWORD,
            firstName: FIRST_NAME,
            lastName: LAST_NAME,
            dateOfBirth: DOB,
            addresses: [
              {
                country: COUNTRY_BILL,
                streetName: STREET_BILL,
                postalCode: POST_BILL,
                city: CITY_BILL
              },
              {
                country: COUNTRY_SHIP,
                streetName: STREET_SHIP,
                postalCode: POST_SHIP,
                city: CITY_SHIP
              }
            ],
            billingAddresses: [0],
            shippingAddresses: [1],
            defaultBillingAddress: BILLING_DEF,
            defaultShippingAddress: SHIPPING_DEF
          }
        })
        .execute();
    };
    createCustomer()
      .then((resp) => {
        console.log('created', resp.statusCode);
        this.signupModal.show({
          status: 'success',
          firstName: resp.body.customer.firstName,
          lastName: resp.body.customer.lastName
        });
      })
      .catch((error) => {
        console.log('error', error.body.message);
        if (
          error.body.message === 'Request body does not contain valid JSON.'
        ) {
          this.signupModal.show({ status: 'form error' });
        } else {
          this.signupModal.show({ status: 'user exists', email: EMAIL });
        }
      });
  }

  public async loginCustomer(EMAIL: string, PASSWORD: string): Promise<void> {
    const apiRoot = createApiBuilderFromCtpClient(
      createCtpClientWithCredentials(EMAIL, PASSWORD)
    ).withProjectKey({
      projectKey: apiData.PROJECT_KEY
    });

    const authenticateCustomer = () => {
      return apiRoot
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
}
