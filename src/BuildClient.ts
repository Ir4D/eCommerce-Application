import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions
} from "@commercetools/sdk-client-v2";
import apiData from "./apiData";

const projectKey = apiData.PROJECT_KEY || "";

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: apiData.AUTH_URL || "",
  projectKey,
  credentials: {
    clientId: apiData.CLIENT_ID || "",
    clientSecret: apiData.CLIENT_SECRET || ""
  },
  scopes: [apiData.SCOPES || ""],
  fetch
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiData.API_URL || "",
  fetch
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
