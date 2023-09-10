import {
  Cart,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import {
  GetCart,
  GetProductsPublished,
  getProductCategories,
  CreateCart
} from '../api/apiMethods';

export default abstract class State {
  public static catalog:
    | ClientResponse<ProductProjectionPagedQueryResponse>
    | undefined;
  public static categories:
    | ClientResponse<CategoryPagedQueryResponse>
    | undefined;
  public static cart: ClientResponse<Cart> | undefined;

  public static async setCatalog(handleError: () => void): Promise<void> {
    try {
      State.catalog = await GetProductsPublished();
    } catch {
      handleError();
    }
  }

  public static async setCategories(handleError: () => void): Promise<void> {
    try {
      State.categories = await getProductCategories();
    } catch {
      handleError();
    }
  }

  public static get CategoryMap(): Map<string, string> {
    const categoryMap: Map<string, string> = new Map();
    State.categories?.body.results.forEach((category) => {
      categoryMap.set(`${category.name.en}`, `${category.id}`);
    });
    return categoryMap;
  }

  public static async setCart(handleError: () => void): Promise<void> {
    try {
      const CUSTOMER_ID = localStorage.getItem(
        'customerID' /* dbc27050-d4bb-4258-aab5-031a4b0d13ec */
      );
      const CURRENCY = 'EUR';
      // for the purposes of cart testing:
      const CART_ID = 'daa28bb4-7a2d-42bb-9580-8b0fa6e3a998';
      if (CUSTOMER_ID) {
        State.cart = await GetCart(CART_ID);
        console.log('state cart', State.cart);
      }
    } catch {
      handleError();
    }
  }

  public static async createNewCart(handleError: () => void): Promise<void> {
    try {
      this.cart = await CreateCart('EUR');
    } catch {
      handleError();
    }
  }

  public static async init(
    handleCatalogError: () => void,
    handleCategoriesError: () => void,
    handleCartError: () => void
  ): Promise<void> {
    await this.setCatalog(handleCatalogError);
    await this.setCategories(handleCategoriesError);
    await this.setCart(handleCartError);
  }
}
