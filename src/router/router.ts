export default class Router {
  public static push(location: string, title: string): void {
    window.history.pushState({}, title, location);
  }
}
