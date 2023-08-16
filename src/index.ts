import "./index.scss";
import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  createApiBuilderFromCtpClient
} from "@commercetools/platform-sdk";
import App from "./app";
import { Customer } from "./api/CustomerControl";
import { createCtpClient } from "./api/BuildClients";
import { apiData } from "./api/apiData";
import { loginCheck } from "./api/loginLogic";
import { signupCreate } from "./api/signupLogic";

const app = new App();
app.init();

const submitForm = document.querySelector(".form-button");
submitForm?.addEventListener("click", signupCreate);

const apiRootN = createApiBuilderFromCtpClient(
  createCtpClient()
).withProjectKey({
  projectKey: apiData.PROJECT_KEY
});
const createClient = (): Promise<
  ClientResponse<ProductProjectionPagedQueryResponse>
> => {
  return apiRootN.productProjections().get().execute();
};
createClient();

// const customer = new Customer();
// customer.createCustomer("harry2@potter.com", "harry");
