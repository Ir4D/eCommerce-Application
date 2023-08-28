/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-lines-per-function */
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { apiData } from '../api/apiData';
import {
  createCtpClientWithCredentials,
  createCtpClientWithScopes
} from '../api/BuildClients';

export class Customer {
  public createMsg(msg = '') {
    document.querySelector<HTMLElement>('.msg')?.remove();
    const insertAfter = (newNode: HTMLElement, referenceNode: HTMLElement) => {
      referenceNode?.parentNode?.insertBefore(
        newNode,
        referenceNode.nextSibling
      );
    };
    const container = document.createElement('div');
    const form = document.querySelector<HTMLElement>('.login-form');
    container.className = 'msg';
    container.textContent = msg;
    if (!form) throw TypeError('smth went wrong...');
    insertAfter(container, form);
  }

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
        localStorage.setItem('customerID', resp.body.customer.id);
        const registerSuccessEvent = new CustomEvent(
          'user-registration-success',
          {
            detail: {
              status: 'success',
              firstName: resp.body.customer.firstName,
              lastName: resp.body.customer.lastName
            }
          }
        );
        window.dispatchEvent(registerSuccessEvent);
        document.querySelector('.logged-item')?.classList.remove('hidden');
        document.querySelector('.nav-item_login')?.classList.add('hidden');
        document.querySelector('.nav-item_signup')?.classList.add('hidden');
      })
      .catch((/* error */) => {
        const registerRejectEvent = new CustomEvent('user-registration-fail', {
          detail: {
            status: 'user exists',
            email: EMAIL
          }
        });
        window.dispatchEvent(registerRejectEvent);
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
        localStorage.setItem('customerID', body.customer.id);
        document.querySelector('.logged-item')?.classList.remove('hidden');
        document.querySelector('.nav-item_login')?.classList.add('hidden');
        document.querySelector('.nav-item_signup')?.classList.add('hidden');
        window.location.hash = 'main';
      })
      .catch(() => {
        this.createMsg('Please, be sure your login and password are correct');
      });
  }
}
