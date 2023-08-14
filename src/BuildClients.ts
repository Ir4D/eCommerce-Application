/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions
} from "@commercetools/sdk-client-v2";

import { apiData, apiDataCredentials, apiDataAnonymous, apiDataPassword } from "./apiData";

// // Get access token
// async function getAccessToken1() {
//   try {
//     const loginResponse = await ctpClientCredentials.login();
//     const accessToken = loginResponse.access_token;
//     return accessToken;
//   } catch (error) {
//     console.error("Error getting access token:", error);
//     throw error;
//   }
// }

// async function getAccessToken() {
//   try {
//     const tokenResponse = await fetch(`${apiData.AUTH_URL}/oauth/token`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${Buffer.from(
//           `${apiDataCredentials.CLIENT_ID}:${apiDataCredentials.CLIENT_SECRET}`
//         ).toString("base64")}`
//       },
//       body: new URLSearchParams({
//         grant_type: "client_credentials",
//         scope: apiDataCredentials.SCOPES || ""
//       })
//     });

//     const tokenData = await tokenResponse.json();
//     console.log(tokenData.access_token);
//     return tokenData.access_token;
//   } catch (error) {
//     console.error("Error getting access token:", error);
//     throw error;
//   }
// }

// const accessToken = await getAccessToken();

const projectKey = apiData.PROJECT_KEY || "";
// const EMAIL = "666";
// const PASSWORD = "pass";

// Common
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

// Anonymous Flow Client
const authAnonymousOptions: AnonymousAuthMiddlewareOptions = {
  host: apiData.AUTH_URL || "",
  projectKey,
  credentials: {
    clientId: apiDataAnonymous.CLIENT_ID || "",
    clientSecret: apiDataAnonymous.CLIENT_SECRET || ""
    // anonymousId: NEW_ID || ""
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

// Password Flow Client
// const emailInput = document.querySelector(".login-email") as HTMLInputElement;
// const passInput = document.querySelector(".login-psw") as HTMLInputElement;
// const EMAIL_LOG = emailInput?.value;
// const PASSWORD_LOG = passInput?.value;

const authPasswordOptions: PasswordAuthMiddlewareOptions = {
  host: apiData.AUTH_URL || "",
  projectKey,
  credentials: {
    clientId: apiDataPassword.CLIENT_ID || "",
    clientSecret: apiDataPassword.CLIENT_SECRET || "",
    user: {
      // username: String(document.querySelector(".login-email")?.value as HTMLInputElement),
      username: (document.querySelector(".login-email") as HTMLInputElement)?.value,
      // password: PASSWORD_LOG
      password: (document.querySelector(".login-psw") as HTMLInputElement)?.value
    }
  },
  scopes: [apiDataPassword.SCOPES || ""],
  fetch
};

export const ctpClientPassword = new ClientBuilder()
  .withProjectKey(projectKey)
  .withPasswordFlow(authPasswordOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
