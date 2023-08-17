/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  TokenCache, // optional
  TokenStore, // optional
  TokenCacheOptions // optional
} from '@commercetools/sdk-client-v2';

import {
  apiData,
  apiDataCredentials,
  apiDataAnonymous,
  apiDataPassword
} from './apiData';

const projectKey = apiData.PROJECT_KEY || '';
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiData.API_URL || '',
  fetch
};

// Client Credentials Flow
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: apiData.AUTH_URL || '',
  projectKey,
  credentials: {
    clientId: apiDataCredentials.CLIENT_ID || '',
    clientSecret: apiDataCredentials.CLIENT_SECRET || ''
  },
  scopes: [apiDataCredentials.SCOPES || ''],
  fetch
};

export const ctpClientCredentials = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// Client Anonymous Flow
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

export const ctpClientAnonymous = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(authAnonymousOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// Client Password Flow
const authPasswordOptions: PasswordAuthMiddlewareOptions = {
  host: apiData.AUTH_URL || '',
  projectKey,
  credentials: {
    clientId: apiDataPassword.CLIENT_ID || '',
    clientSecret: apiDataPassword.CLIENT_SECRET || '',
    user: {
      username: (document.querySelector('.login-email') as HTMLInputElement)
        ?.value,
      password: (document.querySelector('.login-psw') as HTMLInputElement)
        ?.value
    }
  },
  scopes: [apiDataPassword.SCOPES || ''],
  fetch
};

export const ctpClientPassword = new ClientBuilder()
  .withProjectKey(projectKey)
  .withPasswordFlow(authPasswordOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
