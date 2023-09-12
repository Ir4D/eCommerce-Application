/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import {
  ClientBuilder,
  Client,
  type AuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type ExistingTokenMiddlewareOptions
} from '@commercetools/sdk-client-v2';

import {
  apiData,
  apiDataCredentials,
  apiDataAnonymous,
  apiDataPassManageCustomers,
  apiDataAnonymous2
} from './apiData';
import TokenHandle from '../services/token/token';

const projectKey = apiData.PROJECT_KEY || '';
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiData.API_URL || '',
  fetch
};

const tokenCache = new TokenHandle();

// Client with existing Token Flow:
export function createCtpClientExistingFlow(): Client {
  const existingTokenMiddlewareOptions: ExistingTokenMiddlewareOptions = {
    force: true
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withExistingTokenFlow(
      `Bearer ${tokenCache.get().token}`,
      existingTokenMiddlewareOptions
    )
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
}

// Client Credentials Flow
export function createCtpClient(): Client {
  const authMiddlewareOptionsNew: AuthMiddlewareOptions = {
    host: apiData.AUTH_URL || '',
    projectKey,
    credentials: {
      clientId: apiDataCredentials.CLIENT_ID || '',
      clientSecret: apiDataCredentials.CLIENT_SECRET || ''
    },
    scopes: [apiDataCredentials.SCOPES || ''],
    fetch
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptionsNew)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
}

// Client Credentials Flow with extended scopes (for Signup)
export function createCtpClientWithScopes(): Client {
  const authMiddlewareOptionsScopes: AuthMiddlewareOptions = {
    host: apiData.AUTH_URL || '',
    projectKey,
    credentials: {
      clientId: apiDataPassManageCustomers.CLIENT_ID || '',
      clientSecret: apiDataPassManageCustomers.CLIENT_SECRET || ''
    },
    scopes: [apiDataPassManageCustomers.SCOPES || ''],
    tokenCache,
    fetch
  };
  const builder = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptionsScopes)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return builder;
}

// Client Anonymous Flow
export function createCtpClientAnonymous(): Client {
  const authAnonymousOptions: AnonymousAuthMiddlewareOptions = {
    host: apiData.AUTH_URL || '',
    projectKey,
    credentials: {
      clientId: apiDataAnonymous.CLIENT_ID || '',
      clientSecret: apiDataAnonymous.CLIENT_SECRET || ''
    },
    scopes: [apiDataAnonymous.SCOPES || ''],
    fetch
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(authAnonymousOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
}

// Client Anonymous Flow with order view
export function createCtpClientAnonymous2(): Client {
  const authAnonymousOptions: AnonymousAuthMiddlewareOptions = {
    host: apiData.AUTH_URL || '',
    projectKey,
    credentials: {
      clientId: apiDataAnonymous2.CLIENT_ID || '',
      clientSecret: apiDataAnonymous2.CLIENT_SECRET || ''
    },
    scopes: [apiDataAnonymous2.SCOPES || ''],
    tokenCache,
    fetch
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(authAnonymousOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
}

// Client Password Flow
export function createCtpClientWithCredentials(
  EMAIL: string,
  PASSWORD: string
): Client {
  const authPasswordOptionsNew: PasswordAuthMiddlewareOptions = {
    host: apiData.AUTH_URL || '',
    projectKey,
    credentials: {
      clientId: apiDataPassManageCustomers.CLIENT_ID || '',
      clientSecret: apiDataPassManageCustomers.CLIENT_SECRET || '',
      user: {
        username: EMAIL,
        password: PASSWORD
      }
    },
    scopes: [apiDataPassManageCustomers.SCOPES || ''],
    tokenCache,
    fetch
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(authPasswordOptionsNew)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
}
