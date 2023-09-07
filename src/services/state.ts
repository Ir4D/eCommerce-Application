import {
  Cart,
  CategoryPagedQueryResponse,
  ClientResponse,
  LineItem,
  LineItemDraft,
  MyCartDraft,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import {
  GetCart,
  GetProductsPublished,
  getProductCategories
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
      const CUSTOMER_ID = localStorage.getItem('customerID');
      const CURRENCY = 'EUR';
      const CART_ID = 'daa28bb4-7a2d-42bb-9580-8b0fa6e3a998';
      if (CUSTOMER_ID) {
        State.cart = await GetCart(CURRENCY);
      }
    } catch {
      handleError();
    }
  }

  public static async init(
    handleCatalogError: () => void,
    handleCategoriesError: () => void
  ): Promise<void> {
    await this.setCatalog(handleCatalogError);
    await this.setCategories(handleCategoriesError);
  }
}
