import {
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import { GetProductsPublished, getProductCategories } from '../api/apiMethods';

export default abstract class State {
  public static catalog:
    | ClientResponse<ProductProjectionPagedQueryResponse>
    | undefined;
  public static categories:
    | ClientResponse<CategoryPagedQueryResponse>
    | undefined;

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

  //   public getCatalog():
  //     | ClientResponse<ProductProjectionPagedQueryResponse>
  //     | undefined {
  //     return this.catalog;
  //   }

  //   public getCategories():
  //     | ClientResponse<CategoryPagedQueryResponse>
  //     | undefined {
  //     return this.categories;
  //   }

  public static async init(
    handleCatalogError: () => void,
    handleCategoriesError: () => void
  ): Promise<void> {
    await this.setCatalog(handleCatalogError);
    await this.setCategories(handleCategoriesError);
  }
}
