export default abstract class Router {
  public static pages = {

    main: "#main",
    about: "#about",
    catalog: "#catalog",
    login: "#login",
    notFound: "#404"
  };

  public static navigate(location: string): void {
    window.location.hash = location;
  }
}
