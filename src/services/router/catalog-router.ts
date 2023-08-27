import Router from './router';

export default class CatalogRouter extends Router {
  public static navigate(location: string): void {
    window.location.hash = location;
  }
}
