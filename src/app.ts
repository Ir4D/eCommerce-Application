
import Layout from "./pages/layout";

export default class App {
  public appContainer = document.querySelector<HTMLElement>("body");

  public init(): void {
    if (!this.appContainer) throw new Error("error");
    new Layout().render(this.appContainer);
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// import { GetProductsPublished } from "./apiMethods";

// export default function App(): void {
//   GetProductsPublished();
// }

