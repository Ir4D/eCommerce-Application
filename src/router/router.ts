export default abstract class Router {
  public static pages = [
    {
      id: "main",
      route: "#main",
      description: "MAIN"
    },
    {
      id: "login",
      route: "#login",
      description: "LOG IN"
    }
  ];

  public static push(location: string): void {
    window.location.hash = location;
  }

  //   public static push(event: MouseEvent, pathname: string): void {
  //     event.preventDefault();
  //     window.history.pushState({}, pathname, window.location.origin + pathname);
  //   }
}
