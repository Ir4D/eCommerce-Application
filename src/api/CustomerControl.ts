/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { apiData } from "./apiData";
import {
  createCtpClientWithCredentials,
  createCtpClientWithScopes
} from "./BuildClients";

export class Customer {
  public async createCustomer(EMAIL: string, PASSWORD: string): Promise<void> {
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
            password: PASSWORD
          }
        })
        .execute();
    };
    createCustomer()
      .then(({ body }) => {
        console.log(body.customer.id);
      })
      .catch(console.error);
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
