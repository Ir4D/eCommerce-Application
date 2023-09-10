import {
  Cart,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import {
  CreateCartAnonim,
  CreateCartCustomer,
  GetCart,
  GetCartByID,
  GetCartFromAnonim,
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

  public static getCurrentCartVersion(CART_ID: string): Promise<number> {
    return GetCartByID(CART_ID)
      .then(({ body }) => {
        return body.version;
      })
      .catch((error) => {
        console.error('Something went wrong:', error);
      });
  }

  public static async setCart(handleError?: () => void): Promise<void> {
    try {
      const CUSTOMER_ID = localStorage.getItem('customerID');
      const CURRENCY = 'EUR';
      const CART_ID = localStorage.getItem('cartID');
      if (CUSTOMER_ID) {
        if (CART_ID) {
          const VERSION = this.getCurrentCartVersion(CART_ID);
          State.cart = await GetCartFromAnonim(
            CUSTOMER_ID,
            CART_ID,
            await VERSION
          );
        } else {
          State.cart = await CreateCartCustomer(CURRENCY);
        }
      } else {
        State.cart = await CreateCartAnonim(CURRENCY);
        localStorage.setItem('cartID', State.cart.body.id);
      }
    } catch {
      if (handleError) handleError();
    }
  }

  public static async init(
    handleCatalogError: () => void,
    handleCategoriesError: () => void
  ): Promise<void> {
    await this.setCatalog(handleCatalogError);
    await this.setCategories(handleCategoriesError);
    await this.setCart();
  }
}
