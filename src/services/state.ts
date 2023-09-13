/* eslint-disable no-lonely-if */
import {
  Cart,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import {
  CreateCartAnonim,
  CreateCartCustomer,
  GetAnonimCartByID,
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

  public static getCurrentAnonimCartVersion(CART_ID: string): Promise<number> {
    return GetAnonimCartByID(CART_ID)
      .then(({ body }) => {
        console.log('version from state', body);
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
          // console.log('loged in with cart id');
          const VERSION = await this.getCurrentCartVersion(CART_ID);
          State.cart = await GetCartFromAnonim(CUSTOMER_ID, CART_ID, VERSION);
        } else {
          // console.log('loged in without cart id');
          State.cart = await CreateCartCustomer(CURRENCY);
        }
      } else {
        // if (CART_ID) {
        //  State.cart = await GetCart(CART_ID);
        // } else {
        //  State.cart = await CreateCartAnonim(CURRENCY);
        //  localStorage.setItem('cartID', State.cart.body.id);
        // }
        // console.log('not loged in');
        State.cart = await CreateCartAnonim(CURRENCY);
        localStorage.setItem('cartID', State.cart.body.id);
      }
    } catch {
      if (handleError) handleError();
    }
  }

  public static async refreshCart(handleError?: () => void): Promise<void> {
    try {
      const CART_ID = localStorage.getItem('cartID');
      const CUSTOMER_ID = localStorage.getItem('customerID');
      if (CART_ID) {
        if (CUSTOMER_ID) {
          State.cart = await GetCartByID(CART_ID);
        } else {
          State.cart = await GetAnonimCartByID(CART_ID);
        }
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
