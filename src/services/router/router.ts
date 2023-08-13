export default abstract class Router {
  public static pages = {
    main: {
      route: "#main"
    },
    about: {
      route: "#about"
    },
    catalog: {
      route: "#catalog"
    },
    login: {
      route: "#login"
    }
  };

  public static push(location: string): void {
    window.location.hash = location;
  }
}
