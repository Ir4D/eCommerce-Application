import {
  createApiBuilderFromCtpClient,
  ClientResponse,
  ProductProjectionPagedQueryResponse
} from "@commercetools/platform-sdk";
import { createCtpClient } from "./api/BuildClients";
import { apiData } from "./api/apiData";
import Layout from "./pages/layout";

export default class App {
  public appContainer = document.querySelector<HTMLElement>("body");

  public init(): void {
    if (!this.appContainer) throw new Error("error");
    new Layout().render(this.appContainer);
  }

  public runClient(): void {
    const apiRoot = createApiBuilderFromCtpClient(
      createCtpClient()
    ).withProjectKey({
      projectKey: apiData.PROJECT_KEY
    });
    const createClient = (): Promise<
      ClientResponse<ProductProjectionPagedQueryResponse>
    > => {
      return apiRoot.productProjections().get().execute();
    };
    createClient();
  }
}
