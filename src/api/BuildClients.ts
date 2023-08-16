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
} from "@commercetools/sdk-client-v2";

import {
  apiData,
  apiDataCredentials,
  apiDataAnonymous,
  apiDataPassword,
  apiDataPassManageCustomers
} from "./apiData";

const projectKey = apiData.PROJECT_KEY || "";
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiData.API_URL || "",
  fetch
};

// Client Credentials Flow
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: apiData.AUTH_URL || "",
  projectKey,
  credentials: {
    clientId: apiDataCredentials.CLIENT_ID || "",
    clientSecret: apiDataCredentials.CLIENT_SECRET || ""
  },
  scopes: [apiDataCredentials.SCOPES || ""],
  fetch
};

export const ctpClientCredentials = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export function createCtpClient() {
  const authMiddlewareOptionsNew: AuthMiddlewareOptions = {
    host: apiData.AUTH_URL || "",
    projectKey,
    credentials: {
      clientId: apiDataCredentials.CLIENT_ID || "",
      clientSecret: apiDataCredentials.CLIENT_SECRET || ""
    },
    scopes: [apiDataCredentials.SCOPES || ""],
    fetch
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptionsNew)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
}

// Client Credentials Flow with extended scopes
export function createCtpClientWithScopes() {
  const authMiddlewareOptionsScopes: AuthMiddlewareOptions = {
    host: apiData.AUTH_URL || "",
    projectKey,
    credentials: {
      clientId: apiDataPassManageCustomers.CLIENT_ID || "",
      clientSecret: apiDataPassManageCustomers.CLIENT_SECRET || ""
    },
    scopes: [apiDataPassManageCustomers.SCOPES || ""],
    fetch
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptionsScopes)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
}

// Client Anonymous Flow
const authAnonymousOptions: AnonymousAuthMiddlewareOptions = {
  host: apiData.AUTH_URL || "",
  projectKey,
  credentials: {
    clientId: apiDataAnonymous.CLIENT_ID || "",
    clientSecret: apiDataAnonymous.CLIENT_SECRET || ""
  },
  scopes: [apiDataAnonymous.SCOPES || ""],
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
  host: apiData.AUTH_URL || "",
  projectKey,
  credentials: {
    clientId: apiDataPassManageCustomers.CLIENT_ID || "",
    clientSecret: apiDataPassManageCustomers.CLIENT_SECRET || "",
    user: {
      username: (document.querySelector(".login-email") as HTMLInputElement)
        ?.value,
      password: (document.querySelector(".login-psw") as HTMLInputElement)
        ?.value
    }
  },
  scopes: [apiDataPassManageCustomers.SCOPES || ""],
  fetch
};

export const ctpClientPassword = new ClientBuilder()
  .withProjectKey(projectKey)
  .withPasswordFlow(authPasswordOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// Client Password Flow2
export function createCtpClientWithCredentials(
  EMAIL: string,
  PASSWORD: string
) {
  const authPasswordOptionsNew: PasswordAuthMiddlewareOptions = {
    host: apiData.AUTH_URL || "",
    projectKey,
    credentials: {
      clientId: apiDataPassManageCustomers.CLIENT_ID || "",
      clientSecret: apiDataPassManageCustomers.CLIENT_SECRET || "",
      user: {
        username: EMAIL,
        password: PASSWORD
      }
    },
    scopes: [apiDataPassManageCustomers.SCOPES || ""],
    fetch
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(authPasswordOptionsNew)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
}
